<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pedido extends Model
{
    protected $fillable = [
        'orcamento_id', 'cliente_id', 'data_entrega',
        'estado_producao', 'responsavel',
    ];

    protected $casts = [
        'data_entrega' => 'date',
    ];

    public function orcamento(): BelongsTo
    {
        return $this->belongsTo(Orcamento::class);
    }

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class);
    }

    public function historico(): HasMany
    {
        return $this->hasMany(PedidoEstadoHistorico::class)->orderBy('data');
    }
}