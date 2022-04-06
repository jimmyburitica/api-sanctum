<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  public function register(Request $request)
  {
    $request->validate([
      'name' => 'required|string',
      'email' => 'required|string|unique:users,email',
      'password' => 'required|string|confirmed'
    ]);

    $user = User::create([
      'name' => $request->name,
      'email' => $request->email,
      'password' => bcrypt($request->password)
    ]);

    $token = $user->createToken('myapptoken')->plainTextToken;

    $response = [
      'user' => $user,
      'token' => $token,
      'token_type' => 'Bearer', //Opcional
    ];

    return response($response, 201);
  }

  public function logout(Request $request)
  {
    $request->user()->tokens()->delete();
    return ['message' => 'Logged out'];
  }

  public function login(Request $request)
  {
    $request->validate([
      'email' => 'required|string',
      'password' => 'required|string',
      'device_name' => 'required|string'
    ]);

    $user = User::where('email', $request->email)->first();
    if (!$user || !Hash::check($request->password, $user->password)) {
      return response(['message' => 'Error en usuario o contraseña']);
    }

    // Si hay tokens los borra y crea uno nuevo.
    $user->tokens()->delete();
    $token = $user->createToken($request->device_name)->plainTextToken;
    return response(['token' => $token]);
  }
}
