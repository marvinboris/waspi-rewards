<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'post_id',
        'text',
    ];

    protected $appends = [
        'ago',
    ];

    public function getAgoAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    // Get $this comment's likes
    public function likes()
    {
        return $this->belongsToMany(User::class, 'comment_likes');
    }

    // Get all data needed for the comment array
    public static function data(Comment $comment)
    {
        $likes = [];
        foreach ($comment->likes as $like) {
            $likes[] = $like->pivot->user_id;
        }
        return array_merge($comment->toArray(), [
            'user' => $comment->user,
            'post' => $comment->post,
            'likes' => $comment->likes,
        ]);;
    }
}
