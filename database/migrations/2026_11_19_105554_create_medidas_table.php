<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('medidas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cliente_id')->constrained('clientes')->cascadeOnDelete();
            $table->decimal('peito', 5, 1)->nullable();
            $table->decimal('cintura', 5, 1)->nullable();
            $table->decimal('quadril', 5, 1)->nullable();
            $table->decimal('altura', 5, 1)->nullable();
            $table->decimal('ombro', 5, 1)->nullable();
            $table->decimal('comprimento', 5, 1)->nullable();
            $table->text('observacoes')->nullable();
            $table->date('data_medicao');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medidas');
    }
};