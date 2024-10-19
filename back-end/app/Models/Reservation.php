<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Utilisateur;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    public function utilisateur(){
        return $this->belongsTo(Utilisateur::class,'utilisateur_id');
    }

    protected $fillable = ['nom_client', 'nb_tables', 'nb_personnes', 'date_reservation','utilisateur_id'];
}
