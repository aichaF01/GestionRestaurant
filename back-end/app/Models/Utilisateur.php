<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Reservation;
use Laravel\Sanctum\HasApiTokens;

class Utilisateur extends Authenticatable
{
    use HasApiTokens, HasFactory;

    public function reservations(){
        return $this->hasMany(Reservation::class,'utilisateur_id');
    }

    protected $fillable = [
        'nom_utilisateur',
        'email_utilisateur',
        'num_telephonique',
        'CIN',
        'type_utilisateur',
        'Mot_passe',
    ];

    protected $hidden = [
        'Mot_passe',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
