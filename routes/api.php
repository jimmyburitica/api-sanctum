<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);

Route::group([
    'middleware' => 'auth:sanctum',
    'namespace' => 'App\Http\Controllers'
  ],
  function () {
    Route::apiResource('post', PostController::class);
    Route::post('logout', 'AuthController@logout');
  }
);

// Route::apiResource('post', App\Http\Controllers\PostController::class)->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});
