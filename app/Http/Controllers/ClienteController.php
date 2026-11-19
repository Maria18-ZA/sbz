<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClienteController extends Controller
{
    public function index()
    {
        return Inertia::render('Clientes/IndexPage', [
            'clientes' => Cliente::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Clientes/CreatePage');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'tipo' => 'required|in:particular,empresa',
            'contacto' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'morada' => 'nullable|string|max:255',
            'setor' => 'nullable|string|max:255',
        ]);

        Cliente::create($validated);

        return redirect()->route('clientes.index')
            ->with('success', 'Cliente criado com sucesso.');
    }

    public function show(Cliente $cliente)
    {
        return Inertia::render('Clientes/ShowPage', [
        'cliente' => $cliente->load('medidas'),
    ]);
    }

    public function edit(Cliente $cliente)
    {
        return Inertia::render('Clientes/EditPage', [
            'cliente' => $cliente,
        ]);
    }

    public function update(Request $request, Cliente $cliente)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'tipo' => 'required|in:particular,empresa',
            'contacto' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'morada' => 'nullable|string|max:255',
            'setor' => 'nullable|string|max:255',
        ]);

        $cliente->update($validated);

        return redirect()->route('clientes.index')
            ->with('success', 'Cliente atualizado.');
    }

    public function destroy(Cliente $cliente)
    {
        $cliente->delete();

        return redirect()->route('clientes.index')
            ->with('success', 'Cliente removido.');
    }
}