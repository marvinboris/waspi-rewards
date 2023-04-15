<?php

namespace App\Models;

use App\Enums\BadgeTypeEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'points',
        'badge',
    ];

    protected $appends = [
        'next_badge',
    ];

    // Get $this user's comments
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // Get $this user's post likes
    public function post_likes()
    {
        return $this->belongsToMany(Post::class, 'post_likes');
    }

    // Get $this user's comment likes
    public function comment_likes()
    {
        return $this->belongsToMany(Comment::class, 'comment_likes');
    }

    // Get $this user's next badge
    public function getNextBadgeAttribute()
    {
        return match ($this->badge) {
            null => BadgeTypeEnum::Beginner->value,
            BadgeTypeEnum::Beginner->value => BadgeTypeEnum::TopFan->value,
            BadgeTypeEnum::TopFan->value => BadgeTypeEnum::SuperFan->value,
            BadgeTypeEnum::SuperFan->value => null,
            default => null,
        };
    }

    // Get all data needed for the user array
    public static function data(User $user)
    {
        $post_likes = [];
        foreach ($user->post_likes as $post_like) {
            $post_likes[] = $post_like->pivot->post_id;
        }
        $comment_likes = [];
        foreach ($user->comment_likes as $comment_like) {
            $comment_likes[] = $comment_like->pivot->comment_id;
        }

        return array_merge($user->toArray(), [
            'comments' => $user->comments,
            'post_likes' => $post_likes,
            'comment_likes' => $comment_likes,
        ]);
    }
}
