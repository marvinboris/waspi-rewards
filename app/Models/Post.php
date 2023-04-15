<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'text',
    ];

    protected $appends = [
        'ago',
    ];

    // Get $this post's comments
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // Get $this post's likes
    public function likes()
    {
        return $this->belongsToMany(User::class, 'post_likes');
    }

    public function getAgoAttribute()
    {
        return $this->created_at->diffForHumans();
    }

    // Get all data needed for the post array
    public static function data(Post $post)
    {
        $comments = [];
        foreach ($post->comments()->orderBy('id', 'DESC')->get() as $comment) {
            $comments[] = Comment::data($comment);
        }
        $likes = [];
        foreach ($post->likes as $like) {
            $likes[] = $like->pivot->user_id;
        }

        return array_merge($post->toArray(), [
            'likes' => $likes,
            'comments' => $comments,
        ]);
    }
}
