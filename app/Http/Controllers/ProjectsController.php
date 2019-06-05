<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use App\Projects;

class ProjectsController extends Controller
{
    public function list(Request $request)
    {
        try {
            if(Auth::check() && Auth::user()->role === 2) {
                $data = Projects::orderBy('created_at', 'desc')->paginate(3);
            } else {
                Log::debug(Carbon::now());
                $data = Projects::where('published', true)->where('published_date', '<=', Carbon::now())->orderBy('created_at', 'desc')->paginate(3);
                Log::debug($data);
            }

            return response()->json(
                [
                    'status' => 'success',
                    'projects' => $data
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

    public function new(Request $request)
    {
        $v = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
            'banner' => 'required|string',
            'content' => 'required|string',
            'publish'  => 'required|boolean',
        ]);

        if ($v->fails())
        {
            return response()->json([
                'status' => 'error',
                'errors' => $v->errors()
            ], 422);
        }

        $project = new Projects;
        $project->title = $request->title;
        $project->description = $request->description;
        $project->banner = $request->banner;
        $project->content = $request->content;
        $project->published = $request->publish;
        $project->published_date = Carbon::parse($request->publish_date)->timezone(env('APP_TIMEZONE', 'Europe/Paris'))->toDateTimeString();
        $project->save();

        return response()->json(['status' => 'success'], 200);
    }

    public function info(Request $request)
    {
        try {
            $data = Projects::findOrFail($request->get('id'));
            return response()->json(
                [
                    'status' => 'success',
                    'project' => $data
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

    public function delete(Request $request)
    {
        if ($request->get('id')) {
            $id = $request->get('id');

            Projects::findOrFail($id)->delete();

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

    public function update(Request $request)
    {
        if ($request->get('id')) {
            $id = $request->get('id');

            $project = Projects::findOrFail($id);

            $project->title = $request->title;
            $project->description = $request->description;
            $project->content = $request->content;
            $project->banner = $request->banner;
            $project->published = $request->published;
            $project->published_date = Carbon::parse($request->published_date)->timezone(env('APP_TIMEZONE', 'Europe/Paris'))->toDateTimeString();
            $project->save();

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
}
