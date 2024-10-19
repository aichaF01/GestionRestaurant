<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use App\Models\Utilisateur;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;

class UtilisateurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $utilisateurs = Utilisateur::where('type_utilisateur','normale')->get();
        return response()->json([
            'results' => $utilisateurs
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
        $validatedData = $request->validate([
            'nom_utilisateur' => 'required|string|max:255',
            'email_utilisateur' => 'required|string|email|max:255|unique:utilisateurs,email_utilisateur',
            'num_telephonique' => 'required|string|max:20',
            'CIN' => 'required|string|max:20|unique:utilisateurs,CIN',
            'Mot_passe' => 'required|string|min:8',
        ], [
            'email_utilisateur.unique' => 'Cet email est déjà utilisé.',
            'CIN.unique' => 'Ce numéro de CIN est déjà utilisé.',
        ]);

        try {
            $user = Utilisateur::create([
                'nom_utilisateur' => $validatedData['nom_utilisateur'],
                'email_utilisateur' => $validatedData['email_utilisateur'],
                'num_telephonique' => $validatedData['num_telephonique'],
                'CIN' => $validatedData['CIN'],
                'Mot_passe' => Hash::make($validatedData['Mot_passe']),
            ]);

            return response()->json($user, 201);

        } catch (QueryException $e) {
            return response()->json(['error' => 'Erreur lors de la création de l\'utilisateur.'], 500);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email_utilisateur' => 'required|string|email',
            'Mot_passe' => 'required|string',
        ]);

        $user = Utilisateur::where('email_utilisateur', $request->email_utilisateur)->first();

        if (!$user || !Hash::check($request->Mot_passe, $user->Mot_passe)) {
            throw ValidationException::withMessages([
                'email_utilisateur' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
        'token' => $token,
        'user' => $user,
    ], 200);
    }

    public function getUserById($id): JsonResponse
    {
        $user = User::find($id);

        if ($user) {
            return response()->json([
                'id' => $user->id,
                'nom_utilisateur' => $user->name // Assurez-vous que 'name' est le champ correct pour le nom d'utilisateur
            ]);
        } else {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Utilisateur $utilisateur)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Utilisateur $utilisateur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Utilisateur $utilisateur)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Utilisateur $utilisateur)
    {
        //
    }
}
