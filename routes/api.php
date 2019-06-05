<?php

use Illuminate\Http\Request;

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

Route::prefix('auth')->group(function () {
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::get('refresh', 'AuthController@refresh');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('user', 'AuthController@user');
        Route::post('logout', 'AuthController@logout');
    });
});

Route::group(['middleware' => 'auth:api'], function () {
    // Users
    Route::get('users', 'UserController@index')->middleware('isAdmin');
    Route::get('users/{id}', 'UserController@show')->middleware('isAdminOrSelf');

    // Globals
    Route::post('globals/set/{key}', 'GlobalDataController@update')->middleware('isAdmin');

    // Upload file
    Route::post('files/upload/images', 'FileController@store')->middleware('isAdmin');
    Route::post('files/delete/images', 'FileController@deleteImage')->middleware('isAdmin');
    Route::get('files/get/images', 'FileController@fetchImages')->middleware('isAdmin');

    // Projects
    Route::post('projects/new', 'ProjectsController@new')->middleware('isAdmin');

    // Project
    Route::post('project/delete', 'ProjectsController@delete')->middleware('isAdmin');
    Route::post('project/update', 'ProjectsController@update')->middleware('isAdmin');
});

// Globals
Route::get('globals/get/{key}', 'GlobalDataController@index');

// Projects
Route::get('projects/get', 'ProjectsController@list');

// Project
Route::get('project/get', 'ProjectsController@info');
