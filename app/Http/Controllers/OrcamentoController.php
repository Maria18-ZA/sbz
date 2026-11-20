<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Orcamento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrcamentoController extends Controller
{
    public function index()
    {
        return Inertia::render('Orcamentos/IndexPage', [
            'orcamentos' => Orcamento::with('cliente')->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Orcamentos/CreatePage', [
            'clientes' => Cliente::orderBy('nome')->get(['id', 'nome']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'data' => 'required|date',
            'validade' => 'nullable|date|after_or_equal:data',
            'itens' => 'required|array|min:1',
            'itens.*.descricao' => 'required|string|max:255',
            'itens.*.tipo_servico' => 'nullable|string|max:255',
            'itens.*.quantidade' => 'required|integer|min:1',
            'itens.*.preco_unitario' => 'required|numeric|min:0',
        ]);

        DB::transaction(function () use ($validated) {
            $total = 0;
            foreach ($validated['itens'] as $item) {
                $total += $item['quantidade'] * $item['preco_unitario'];
            }

            $orcamento = Orcamento::create([
                'cliente_id' => $validated['cliente_id'],
                'data' => $validated['data'],
                'validade' => $validated['validade'] ?? null,
                'estado' => 'rascunho',
                'total' => $total,
            ]);

            foreach ($validated['itens'] as $item) {
                $orcamento->itens()->create([
                    'descricao' => $item['descricao'],
                    'tipo_servico' => $item['tipo_servico'] ?? null,
                    'quantidade' => $item['quantidade'],
                    'preco_unitario' => $item['preco_unitario'],
                    'subtotal' => $item['quantidade'] * $item['preco_unitario'],
                ]);
            }
        });

        return redirect()->route('orcamentos.index')
            ->with('success', 'Orçamento criado.');
    }

   public function show(Orcamento $orcamento)
{
    return Inertia::render('Orcamentos/ShowPage', [
        'orcamento' => $orcamento->load('cliente', 'itens', 'pedido'),
    ]);
}

    public function updateEstado(Request $request, Orcamento $orcamento)
    {
        $validated = $request->validate([
            'estado' => 'required|in:rascunho,enviado,aprovado,rejeitado',
        ]);

        $orcamento->update(['estado' => $validated['estado']]);

        return redirect()->route('orcamentos.show', $orcamento)
            ->with('success', 'Estado atualizado.');
    }

    public function destroy(Orcamento $orcamento)
    {
        $orcamento->delete();

        return redirect()->route('orcamentos.index')
            ->with('success', 'Orçamento removido.');
    }
}