<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cliente extends Model
{
    protected $fillable = [
        'nome', 'tipo', 'contacto', 'email', 'morada', 'setor',
    ];

    public function medidas(): HasMany
    {
        return $this->hasMany(Medida::class)->latest('data_medicao');
    }

    public function orcamentos(): HasMany
{
    return $this->hasMany(Orcamento::class);
}
}