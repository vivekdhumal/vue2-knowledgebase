<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
	public function index() {
		return Project::all();
	}

	public function create()
	{
		return view('add_project');
	}

	public function store(Request $request)
	{
		$this->validate($request, [
			'name' => 'required',
			'description' => 'required'
		]);

		Project::create([
			'name' => $request->input('name'),
			'description' => $request->input('description')
		]);

		return [
			'status' => 'success',
			'message' => 'Project Created'
		];
	}
}
