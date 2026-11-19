<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MedidaController;
use App\Http\Controllers\ClienteController;
use Inertia\Inertia;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('clientes', ClienteController::class);

Route::post('clientes/{cliente}/medidas', [MedidaController::class, 'store'])->name('medidas.store');
Route::delete('medidas/{medida}', [MedidaController::class, 'destroy'])->name('medidas.destroy');

Route::get('/', function () {
    return Inertia::render('DashboardPage');
});