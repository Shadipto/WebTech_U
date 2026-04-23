<?php

declare(strict_types=1);

require __DIR__ . '/includes/bootstrap.php';

if (is_logged_in()) {
    redirect('dashboard.php');
}

$error = '';
$success = flash('success');
$prefilledEmail = $_COOKIE['user_email'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $prefilledEmail = $email;

    if ($email === '' || $password === '') {
        $error = 'Email and password are required.';
    } else {
        $statement = db()->prepare('SELECT id, name, email, password FROM `users` WHERE email = :email LIMIT 1');
        $statement->execute(['email' => $email]);
        $user = $statement->fetch();

        if (!$user || !password_verify($password, $user['password'])) {
            $error = 'Invalid email or password.';
        } else {
            session_regenerate_id(true);
            $_SESSION['user_id'] = (int) $user['id'];
            $_SESSION['user_name'] = $user['name'];
            $_SESSION['user_email'] = $user['email'];

            $lastLogin = date('Y-m-d H:i:s');
            set_login_cookies($user['email'], $lastLogin);

            redirect('dashboard.php');
        }
    }
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
    <main class="container">
        <section class="card">
            <h1>Welcome Back</h1>
            <p>Log in with your registered email and password to continue.</p>

            <?php if ($error !== ''): ?>
                <div class="message error"><?= h($error) ?></div>
            <?php endif; ?>

            <?php if ($success !== null): ?>
                <div class="message success"><?= h($success) ?></div>
            <?php endif; ?>

            <form method="post" class="form-grid" novalidate>
                <div class="field">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" value="<?= h($prefilledEmail) ?>" required>
                </div>

                <div class="field">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>

                <button type="submit" class="button">Log In</button>
            </form>

            <div class="link-row">
                New here? <a href="register.php">Create an account</a>
            </div>
        </section>
    </main>
</body>
</html>
