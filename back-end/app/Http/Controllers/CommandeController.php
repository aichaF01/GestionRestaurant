<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\commande;
use Illuminate\Http\Request;

class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $commandes = commande::all();
        return response()->json([
            'results' => $commandes
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'date_commande' => 'required|date',
            'utilisateur_id' => 'required|exists:utilisateurs,id',
            'plat_id' => 'required|array',
            'plat_id.*' => 'exists:plats,id',
            'totale' => 'required|integer',
        ]);

        DB::transaction(function () use ($validated) {
            $commande = Commande::create([
                'date_commande' => $validated['date_commande'],
                'utilisateur_id' => $validated['utilisateur_id'],
                'totale' => $validated['totale'],
            ]);

            // Associer les plats à la commande
            $commande->plats()->attach($validated['plat_id']);
        });

        return response()->json(['message' => 'Commande créée avec succès'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(commande $commande)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(commande $commande)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, commande $commande)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(commande $commande)
    {
        //
    }
}
