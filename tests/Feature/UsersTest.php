<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UsersTest extends TestCase
{
    private $usersStructure = [
        '*' => [
            'id',
            'name',
            'email',
            'badge',
            'next_badge',
            'points',
            'created_at',
            'updated_at',
        ]
    ];

    /**
     * Test GET /api/users (without access token).
     */
    public function test_get_users(): void
    {
        $response = $this->get('/api/users');

        $response->assertStatus(200);
    }

    /**
     * Test GET /api/users.
     */
    public function test_get_users_with_access_token(): void
    {
        $response = $this->get('/api/users?access_token=' . env('ACCESS_TOKEN'));

        $response->assertStatus(200);
        $response->assertJsonStructure($this->usersStructure);
    }

    /**
     * Test GET /api/users with filters.
     */
    public function test_get_users_with_filters(): void
    {
        $response = $this->get('/api/users?access_token=' . env('ACCESS_TOKEN') . '&points=0&badge=null');

        $response->assertStatus(200);
        $response->assertJsonStructure($this->usersStructure);
    }
}
