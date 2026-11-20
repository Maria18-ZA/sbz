<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Orcamento extends Model
{
    protected $fillable = [
        'cliente_id', 'data', 'validade', 'estado', 'total',
    ];

    protected $casts = [
        'data' => 'date',
        'validade' => 'date',
        'total' => 'decimal:2',
    ];

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class);
    }

    public function itens(): HasMany
    {
        return $this->hasMany(OrcamentoItem::class);
        
    }

    public function pedido(): HasOne
{
    return $this->hasOne(Pedido::class);
}

}
