<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Medida extends Model
{
    protected $fillable = [
        'cliente_id', 'peito', 'cintura', 'quadril',
        'altura', 'ombro', 'comprimento', 'observacoes', 'data_medicao',
    ];

    protected $casts = [
        'data_medicao' => 'date',
    ];

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class);
    }
}