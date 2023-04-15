<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Boris Ndouma',
                'email' => 'jaris.ultio.21@gmail.com',
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
