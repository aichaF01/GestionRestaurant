<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlatController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\UtilisateurController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/plats',[PlatController::class, 'index']);
Route::get('/utilisateurs',[UtilisateurController::class, 'index']);
Route::post('/login',[UtilisateurController::class, 'login']);
Route::get('/reservations',[ReservationController::class, 'index']);
Route::get('/commandes',[CommandeController::class, 'index']);
Route::post('/reservation', [ReservationController::class, 'store']);
Route::post('/commandes', [CommandeController::class, 'store']);
Route::post('/inscription',[UtilisateurController::class, 'store']);
