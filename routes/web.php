<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MedidaController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\OrcamentoController;
use App\Http\Controllers\PedidoController;
use Inertia\Inertia;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('clientes', ClienteController::class);

Route::post('clientes/{cliente}/medidas', [MedidaController::class, 'store'])->name('medidas.store');
Route::delete('medidas/{medida}', [MedidaController::class, 'destroy'])->name('medidas.destroy');

Route::get('pedidos', [PedidoController::class, 'index'])->name('pedidos.index');
Route::get('pedidos/{pedido}', [PedidoController::class, 'show'])->name('pedidos.show');
Route::post('orcamentos/{orcamento}/pedido', [PedidoController::class, 'store'])->name('pedidos.store');
Route::patch('pedidos/{pedido}/estado', [PedidoController::class, 'updateEstado'])->name('pedidos.estado');

Route::resource('orcamentos', OrcamentoController::class)->except(['edit', 'update']);
Route::patch('orcamentos/{orcamento}/estado', [OrcamentoController::class, 'updateEstado'])
    ->name('orcamentos.estado');
Route::get('/', function () {
    return Inertia::render('DashboardPage');
});