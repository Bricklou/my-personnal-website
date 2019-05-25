<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\GlobalData;

class GlobalDataController extends Controller
{
    public function index(Request $request, $key)
    {
        try {
            $data = GlobalData::where("key", $key)->first();
            return response()->json(
                [
                    'status' => 'success',
                    'value' => $data->value
                ],
                200
            );
        } catch (ModelNotFoundException $e) {
            return response()->json(
                [
                    'status' => 'error'
                ],
                404
            );
        }
    }

    public function update(Request $request, $key)
    {
        try {
            $data = GlobalData::where("key", $key)->first();
            $data->value = $request->value;
            $data->save();
            return response()->json(
                [
                    'status' => 'success'
                ],
                200
            );
        } catch (ModelNotFoundException $e) {
            return response()->json(
                [
                    'status' => 'error'
                ],
                404
            );
        }
    }
}
