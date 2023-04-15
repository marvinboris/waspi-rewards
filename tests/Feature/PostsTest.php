<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PostsTest extends TestCase
{
    private $getPostsStructure = [
        'account' => [
            'id',
            'name',
            'email',
            'badge',
            'next_badge',
            'points',
            'created_at',
            'updated_at',
            'post_likes',
            'comment_likes',
            'comments',
        ],
        'posts' => [
            '*' => [
                'id',
                'text',
                'created_at',
                'updated_at',
                'ago',
                'likes',
                'comments',
            ]
        ],
        'comments' => [
            '*' => [
                'id',
                'user_id',
                'post_id',
                'text',
                'created_at',
                'updated_at',
                'ago',
                'likes',
                'user',
                'post',
            ]
        ]
    ];

    private $postPostsStructure = [
        'account' => [
            'id',
            'name',
            'email',
            'badge',
            'next_badge',
            'points',
            'created_at',
            'updated_at',
            'post_likes',
            'comment_likes',
            'comments',
        ],
        'post' => [
            'id',
            'text',
            'created_at',
            'updated_at',
            'ago',
            'likes',
            'comments',
        ],
        'comments' => [
            '*' => [
                'id',
                'user_id',
                'post_id',
                'text',
                'created_at',
                'updated_at',
                'ago',
                'likes',
                'user',
                'post',
            ]
        ]
    ];

    /**
     * Test GET /api/posts.
     */
    public function test_get_posts(): void
    {
        $response = $this->get('/api/posts');

        $response->assertStatus(200);
        $response->assertJsonStructure($this->getPostsStructure);
    }

    /**
     * Test POST /api/posts/{post_id}/likes.
     */
    public function test_post_posts_like(): void
    {
        $response = $this->post('/api/posts/1/likes');

        $response->assertStatus(200);
        $response->assertJsonStructure($this->postPostsStructure);
    }

    /**
     * Test POST /api/posts/{post_id}/comments.
     */
    public function test_post_posts_comment(): void
    {
        $response = $this->post('/api/posts/1/comments', [
            'text' => 'Comment test'
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure($this->postPostsStructure);
    }

    /**
     * Test DELETE /api/posts/{post_id}/comments/{comment_id}.
     */
    public function test_delete_posts_comment(): void
    {
        $user = User::first();
        $post = Post::first();
        $comment = $user->comments()->create([
            'post_id' => $post->id,
            'text' => 'Test comment text',
        ]);

        $response = $this->delete('/api/posts/' . $post->id . '/comments/' . $comment->id);

        $response->assertStatus(200);
        $response->assertJsonStructure($this->postPostsStructure);
    }

    /**
     * Test POST /api/posts/{post_id}/comments/{comment_id}/likes.
     */
    public function test_post_posts_comment_likes(): void
    {
        $user = User::first();
        $post = Post::first();
        $comment = $user->comments()->create([
            'post_id' => $post->id,
            'text' => 'Test comment text',
        ]);
        
        $response = $this->post('/api/posts/' . $post->id . '/comments/' . $comment->id . '/likes');
        
        $comment->delete();

        $response->assertStatus(200);
        $response->assertJsonStructure($this->postPostsStructure);
    }
}
