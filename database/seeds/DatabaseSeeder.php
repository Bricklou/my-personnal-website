<?php

use Illuminate\Database\Seeder;
use App\User;
use App\GlobalData;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'username' => env('DEFAULT_ADMIN_USERNAME', 'Admin'),
            'email' => env('DEFAULT_ADMIN_EMAIL', 'admin@example.com'),
            'firstName' => env('DEFAULT_ADMIN_FIRSTNAME', ''),
            'lastName' => env('DEFAULT_ADMIN_LASTNAME', ''),
            'password' => Hash::make(env('DEFAULT_ADMIN_PASSWORD', 'admin')),
            'role' => 2
        ]);

        GlobalData::create([
            'key' => 'about-me',
            'value' => ''
        ]);
    }
}
