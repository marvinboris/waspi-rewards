<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Enums\BadgeTypeEnum;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UsersTableSeeder::class,
        ]);
        User::factory(10)->create();
        Post::factory(10)->hasComments(5)->hasLikes(5)->create();

        foreach (User::all() as $user) {
            if ($user->post_likes()->count() + $user->comment_likes()->count() >= 10) $user->update(['points' => $user->points + 500, 'badge' => BadgeTypeEnum::Beginner->value]);
            if ($user->comments()->count() >= 1) $user->update(['points' => $user->points + 50, 'badge' => BadgeTypeEnum::Beginner->value]);
            if ($user->comments()->count() >= 30) $user->update(['points' => $user->points + 2500, 'badge' => BadgeTypeEnum::TopFan->value]);
            if ($user->comments()->count() >= 50) $user->update(['points' => $user->points + 5000, 'badge' => BadgeTypeEnum::SuperFan->value]);
        }
    }
}
