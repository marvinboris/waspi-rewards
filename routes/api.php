<?php

use App\Enums\BadgeTypeEnum;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use App\Utils\Api;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// List all users in the system in JSON format
Route::name('users.index')->get('users', function (Request $request) {
    $access_token = $request->access_token; // Read required access token parameter
    $type = $request->type; // Read optional badge type parameter
    $points = $request->points; // Read optional option parameter

    $users = [];
    $filteredData = User::orderBy('id');

    if (!$access_token || $access_token !== env('ACCESS_TOKEN'))
        return response()->json(null); // If the access token is missing or wrong, return nothing

    if ($type) $filteredData = $filteredData->where('users.badge', $type); // Filter by badge type when set
    if ($points) $filteredData = $filteredData->where('users.points', $points); // Filter by points when set

    $filteredData = $filteredData->get();

    foreach ($filteredData as $user) {
        $users[] = $user->toArray();
    }

    return response()->json($users); // Return them in JSON format
});

// Group of all necessary routes for posts, comments and likes
Route::prefix('posts')->name('posts.')->group(function () {
    Route::prefix('{post_id}')->group(function () {
        Route::prefix('comments')->name('comments.')->group(function () {
            Route::prefix('{comment_id}')->group(function () {
                // Like or unlike a comment
                Route::post('likes', function (Request $request, $post_id, $comment_id) {
                    $user = User::first();
                    $like = $user->comment_likes()->find($comment_id); // Check if the user has already liked the comment

                    $oldPoints = $user->points;
                    $newPoints = $oldPoints;

                    $likes = count($user->comment_likes) + count($user->post_likes); // Get all user's likes
                    if ($like) {
                        $user->comment_likes()->detach($comment_id); // Unlike a post
                        $newPoints -= 500; // Subtract user's points because they don't fulfill the requirement anymore
                        if ($likes === 10) $user->update(['points' => $newPoints]); // Update user's points
                    } else {
                        $user->comment_likes()->attach($comment_id); // Like a post
                        $newPoints += 500; // Add points because the user fulfills the requirement
                        if ($likes === 9) $user->update(['points' => $newPoints]); // Update user's points
                    }

                    Api::handleUserBadge($user, $oldPoints, $newPoints);

                    $data = Api::getUpdatedData($post_id);

                    return response()->json($data);
                })->name('likes');

                // Delete a comment
                Route::delete('', function (Request $request, $post_id, $comment_id) {
                    $user = User::first();
                    $comment = $user->comments()->find($comment_id); // Get the comment from user's comment list
                    $like = $user->comment_likes()->find($comment_id); // Check if the user has already liked the comment
                    
                    $oldPoints = $user->points;
                    $newPoints = $oldPoints;

                    $likes = count($user->comment_likes) + count($user->post_likes); // Get all user's likes
                    if ($like) {
                        $user->comment_likes()->detach($comment_id); // Unlike a post
                        $newPoints -= 500; // Subtract user's points because they don't fulfill the requirement anymore
                        if ($likes === 10) $user->update(['points' => $newPoints]); // Update user's points
                    }

                    $newPoints = Api::handleUserPointsByComments($user, true);
                    Api::handleUserBadge($user, $oldPoints, $newPoints);

                    $comment->delete();

                    $data = Api::getUpdatedData($post_id);

                    return response()->json($data);
                })->name('delete');
            });

            // Comment a post
            Route::post('', function (Request $request, $post_id) {
                $user = User::first();
                $user->comments()->create([
                    'post_id' => $post_id,
                    'text' => $request->text,
                ]); // Create a comment

                $oldPoints = $user->points;
                $newPoints = Api::handleUserPointsByComments($user);
                Api::handleUserBadge($user, $oldPoints, $newPoints);

                $data = Api::getUpdatedData($post_id);

                return response()->json($data);
            })->name('create');
        });

        // Like or unlike a post
        Route::post('likes', function (Request $request, $post_id) {
            $user = User::first();
            $like = $user->post_likes()->find($post_id); // Check if the user has already liked the post

            $oldPoints = $user->points;
            $newPoints = $oldPoints;

            $likes = count($user->comment_likes) + count($user->post_likes); // Get all user's likes
            if ($like) {
                $user->post_likes()->detach($post_id); // Unlike a post
                $newPoints -= 500; // Subtract user's points because they don't fulfill the requirement anymore
                if ($likes === 10) $user->update(['points' => $newPoints]); // Update user's points
            } else {
                $user->post_likes()->attach($post_id); // Like a post
                $newPoints += 500; // Add points because the user fulfills the requirement
                if ($likes === 9) $user->update(['points' => $newPoints]); // Update user's points
            }

            Api::handleUserBadge($user, $oldPoints, $newPoints);

            $data = Api::getUpdatedData($post_id);

            return response()->json($data);
        })->name('likes');
    });

    // Get default user, all posts and recent comments
    Route::get('', function () {
        $user = User::first();

        $posts = [];
        foreach (Post::orderBy('id', 'DESC')->get() as $post) {
            $posts[] = Post::data($post);
        }

        $comments = [];
        foreach (Comment::orderBy('id', 'DESC')->take(5)->get() as $comment) {
            $comments[] = Comment::data($comment);
        }

        return response()->json([
            'account' => User::data($user),
            'posts' => $posts,
            'comments' => $comments,
        ]);
    })->name('index');
});
