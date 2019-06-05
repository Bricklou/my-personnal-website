<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Files;

class FileController extends Controller
{
    public function store(Request $request)
    {
        if ($request->get('image')) {
            $image = $request->get('image');
            $name = time() . '.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
            $path = public_path('storage/images/');

            if (!File::exists($path)) {
                File::makeDirectory($path, 0775, true, true);
            }

            $imageFile = \Image::make($request->get('image'));
            $imageFile->save($path. $name);
            $imageFile->destroy();

            $image = new Files();
            $image->filename = $name;
            $image->type = $request->type;
            $image->save();

            return response()->json([
                'status' => 'success',
                'image' => $image
            ], 200);
        }

        return response()->json(
            [
                'status' => 'error'
            ],
            400
        );
    }

    public function deleteImage(Request $request)
    {
        if ($request->get('image')) {
            $image = $request->get('image');

            Files::where('filename', basename($image))->first()->delete();

            unlink(public_path('/storage/images/' . $image));

            return response()->json([
                'status' => 'success'
            ], 200);
        }

        return response()->json(
            [
                'status' => 'error'
            ],
            400
        );
    }

    public function fetchImages(Request $request) {
        $type = $request->get('type');
        if ($type) {
            $images = Files::where("type", $type)->get();
        } else {
            $images = Files::all();
        }

        return response()->json(
            [
                'status' => 'succes',
                'images' => $images
            ],
            200
        );
    }
}
