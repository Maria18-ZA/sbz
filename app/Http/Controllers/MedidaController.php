<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Medida;
use Illuminate\Http\Request;

class MedidaController extends Controller
{
    public function store(Request $request, Cliente $cliente)
    {
        $validated = $request->validate([
            'data_medicao' => 'required|date',
            'peito' => 'nullable|numeric|min:0',
            'cintura' => 'nullable|numeric|min:0',
            'quadril' => 'nullable|numeric|min:0',
            'altura' => 'nullable|numeric|min:0',
            'ombro' => 'nullable|numeric|min:0',
            'comprimento' => 'nullable|numeric|min:0',
            'observacoes' => 'nullable|string',
        ]);

        $cliente->medidas()->create($validated);

        return redirect()->route('clientes.show', $cliente)
            ->with('success', 'Medição registada.');
    }

    public function destroy(Medida $medida)
    {
        $clienteId = $medida->cliente_id;
        $medida->delete();

        return redirect()->route('clientes.show', $clienteId)
            ->with('success', 'Medição removida.');
    }
}