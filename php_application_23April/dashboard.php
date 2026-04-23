<?php

declare(strict_types=1);

require __DIR__ . '/includes/bootstrap.php';

if (!is_logged_in()) {
    redirect('login.php');
}

$user = current_user();
$lastLogin = $_COOKIE['last_login'] ?? 'Not available';
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
    <main class="container">
        <section class="card card-wide">
            <h1>Dashboard</h1>
            <p>Access is protected by a valid PHP session.</p>

            <div class="message success">Welcome, <?= h($user['name'] ?? '') ?>.</div>

            <div class="meta-grid">
                <div class="meta-item">
                    <span class="meta-label">Name</span>
                    <div class="meta-value"><?= h($user['name'] ?? '') ?></div>
                </div>

                <div class="meta-item">
                    <span class="meta-label">Email</span>
                    <div class="meta-value"><?= h($user['email'] ?? '') ?></div>
                </div>

                <div class="meta-item">
                    <span class="meta-label">Last login time</span>
                    <div class="meta-value"><?= h((string) $lastLogin) ?></div>
                </div>
            </div>

            <div class="actions">
                <a class="button secondary" href="logout.php">Logout</a>
            </div>
        </section>
    </main>
</body>
</html>
