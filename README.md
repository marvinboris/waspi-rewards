# Waspi Rewards Setup Guide

This guide will walk you through the steps to set up Waspi Rewards built with Laravel.

## Prerequisites

Before you begin, ensure that you have the following installed on your system:

-   [Node.js](https://nodejs.org/en/download/)
-   [Composer](https://getcomposer.org/download/)
-   [PHP 8.1 or higher](https://www.php.net/manual/en/install.php)
-   [MySQL or MariaDB](https://dev.mysql.com/downloads/)
-   Git

## Installation

1. Clone the repository by running the following command in your terminal:

```
git clone https://github.com/marvinboris/waspi-rewards.git
```

2. Navigate to the project directory:

```
cd waspi-rewards
```

3. Install the project dependencies:

```
composer install
npm install
```

4. Create a new .env file by copying the .env.example file:

```
cp .env.example .env
```

5. Generate a new application key:

```
php artisan key:generate
```

6. Update the .env file with your database credentials and the access token:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=waspi_rewards
DB_USERNAME=root
DB_PASSWORD=

ACCESS_TOKEN=
```

7. Run the database migrations:

```
php artisan migrate
```

8. Seed the database with sample data:

```
php artisan db:seed
```

9. Start the development server:

```
npm run dev
php artisan serve
```

10. Visit <http://localhost:8000> in your browser to access Waspi Rewards.

## Testing

Run the test using the php artisan test command:

```
php artisan test
```

## Usage

Waspi Rewards allows users to earn points by liking and commenting posts.

## Conclusion

Congratulations! You have successfully set up Waspi Rewards. You can now start using the app to manage your points and rewards. If you have any issues or questions, please refer to the Laravel documentation or reach me out for assistance.
