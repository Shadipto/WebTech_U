<?php

declare(strict_types=1);

require __DIR__ . '/includes/bootstrap.php';

$error = '';
$success = flash('success');
$name = '';
$email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($name === '' || $email === '' || $password === '') {
        $error = 'All fields are required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Please enter a valid email address.';
    } elseif (strlen($password) < 6) {
        $error = 'Password must be at least 6 characters long.';
    } else {
        $check = db()->prepare('SELECT id FROM `users` WHERE email = :email LIMIT 1');
        $check->execute(['email' => $email]);

        if ($check->fetch()) {
            $error = 'An account with this email already exists.';
        } else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            $statement = db()->prepare('INSERT INTO `users` (name, email, password) VALUES (:name, :email, :password)');
            $statement->execute([
                'name' => $name,
                'email' => $email,
                'password' => $hashedPassword,
            ]);

            flash('success', 'Registration successful. Please log in.');
            redirect('login.php');
        }
    }
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Register</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
    <main class="container">
        <section class="card">
            <h1>Create Account</h1>
            <p>Register with your name, email, and password to access the dashboard.</p>

            <?php if ($error !== ''): ?>
                <div class="message error"><?= h($error) ?></div>
            <?php endif; ?>

            <?php if ($success !== null): ?>
                <div class="message success"><?= h($success) ?></div>
            <?php endif; ?>

            <form method="post" class="form-grid" novalidate>
                <div class="field">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" value="<?= h($name) ?>" required>
                </div>

                <div class="field">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" value="<?= h($email) ?>" required>
                </div>

                <div class="field">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>

                <button type="submit" class="button">Register</button>
            </form>

            <div class="link-row">
                Already have an account? <a href="login.php">Log in</a>
            </div>
        </section>
    </main>
</body>
</html>
