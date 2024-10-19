<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class commande extends Model
{
    use HasFactory;
    protected $fillable = ['date_commande', 'utilisateur_id', 'totale'];

    public function plats()
    {
        return $this->belongsToMany(Plat::class, 'commande_plat');
    }
}
