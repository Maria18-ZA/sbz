<?php

namespace App\Http\Controllers;

use App\Models\Orcamento;
use App\Models\Pedido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PedidoController extends Controller
{
    public function index()
    {
        return Inertia::render('Pedidos/IndexPage', [
            'pedidos' => Pedido::with('cliente', 'orcamento')
                ->latest()
                ->get(),
        ]);
    }

    public function store(Request $request, Orcamento $orcamento)
    {
        if ($orcamento->estado !== 'aprovado') {
            return back()->withErrors(['orcamento' => 'Só orçamentos aprovados podem gerar pedido.']);
        }

        if ($orcamento->pedido) {
            return back()->withErrors(['orcamento' => 'Este orçamento já tem um pedido.']);
        }

        $validated = $request->validate([
            'data_entrega' => 'nullable|date',
            'responsavel' => 'nullable|string|max:255',
        ]);

        $pedido = DB::transaction(function () use ($orcamento, $validated) {
            $pedido = Pedido::create([
                'orcamento_id' => $orcamento->id,
                'cliente_id' => $orcamento->cliente_id,
                'data_entrega' => $validated['data_entrega'] ?? null,
                'estado_producao' => 'medicao',
                'responsavel' => $validated['responsavel'] ?? null,
            ]);

            $pedido->historico()->create([
                'estado' => 'medicao',
                'data' => now(),
            ]);

            return $pedido;
        });

        return redirect()->route('pedidos.show', $pedido)
            ->with('success', 'Pedido criado.');
    }

    public function show(Pedido $pedido)
    {
        return Inertia::render('Pedidos/ShowPage', [
            'pedido' => $pedido->load('cliente', 'orcamento.itens', 'historico'),
        ]);
    }

    public function updateEstado(Request $request, Pedido $pedido)
    {
        $validated = $request->validate([
            'estado_producao' => 'required|in:medicao,corte,costura,prova,entrega',
        ]);

        DB::transaction(function () use ($pedido, $validated) {
            $pedido->update(['estado_producao' => $validated['estado_producao']]);

            $pedido->historico()->create([
                'estado' => $validated['estado_producao'],
                'data' => now(),
            ]);
        });

        return redirect()->route('pedidos.show', $pedido)
            ->with('success', 'Estado atualizado.');
    }
}