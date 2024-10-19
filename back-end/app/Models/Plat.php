<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plat extends Model
{
    protected $fillable = ['image_plat', 'nom_plat','description_plat','prix_plat'];
}
