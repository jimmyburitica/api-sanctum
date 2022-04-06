<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $post = Post::all();
    return $post;
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
public function store(Request $request)
{
  $request->validate([
    'title' => 'required',
    'link' => 'required',
    'content' => 'required'
  ]);
  $post = Post::create($request->all());
  return $post;
}

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Post  $post
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $post = Post::findOrFail($id);
    return $post;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Post  $post
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    $post = Post::findOrFail($id);
    $post->update($request->all());
    return $post;
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Post  $post
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $post = Post::findOrFail($id);
    $post->delete();
    // 204 - No Content
    return response()->json(['message' => 'Success'], 204);
  }
}
