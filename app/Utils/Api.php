<?php

namespace App\Utils;

use App\Enums\BadgeTypeEnum;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;

class Api
{
    // Get updated data on change
    public static function getUpdatedData($post_id)
    {
        // Get post new info
        $post = Post::find($post_id);

        // Get account new info
        $user = User::first();

        $comments = [];
        foreach (Comment::orderBy('id', 'DESC')->take(5)->get() as $comment) {
            $comments[] = Comment::data($comment);
        }

        return [
            'account' => User::data($user),
            'post' => Post::data($post),
            'comments' => $comments,
        ];
    }

    // Update user points because of comments
    public static function handleUserPointsByComments(User $user, bool $delete = false)
    {
        $total_comments = $user->comments()->count(); // Get total comments

        $points = match ($total_comments) {
            1 => 50,
            30 => 2500,
            50 => 5000,
            default => 0,
        }; // Determine the number of points to add to the user depending on his total comments
        $newPoints = $user->points + ($delete ? -$points : $points);
        $user->update(['points' => $newPoints]); // Add the corresponding points to the user

        return $newPoints;
    }

    // Update user badge
    public static function handleUserBadge(User $user, int $oldPoints, int $newPoints)
    {
        $value = null;

        if ($oldPoints < 50 && 50 <= $newPoints) $value = BadgeTypeEnum::Beginner->value;
        else if ($newPoints < 50 && 50 <= $oldPoints) $value = null;
        else if ($oldPoints < 2500 && 2500 <= $newPoints) $value = BadgeTypeEnum::TopFan->value;
        else if ($newPoints < 2500 && 2500 <= $oldPoints) $value = BadgeTypeEnum::Beginner->value;
        else if ($oldPoints < 5000 && 5000 <= $newPoints) $value = BadgeTypeEnum::SuperFan->value;
        else if ($newPoints < 5000 && 5000 <= $oldPoints) $value = BadgeTypeEnum::TopFan->value;
        else return;

        $user->update(['badge' => $value]);
    }
}
