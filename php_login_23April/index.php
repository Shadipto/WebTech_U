<?php
session_start();
date_default_timezone_set('Asia/Dhaka');

$sessionTimeout = 30;

// If a logged-in session exists, validate absolute expiry first.
if (isset($_SESSION['username'])) {
    if (isset($_SESSION['expires_at']) && time() > $_SESSION['expires_at']) {
        $_SESSION = [];

        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params['path'],
                $params['domain'],
                $params['secure'],
                $params['httponly']
            );
        }

        session_destroy();
        session_start();
    } else {
        header('Location: dashboard.php');
        exit;
    }
}

$validUsername = 'dipto';
$validPassword = '696969';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if ($username === '' || $password === '') {
        $error = 'Both fields are required.';
    } elseif ($username === $validUsername && $password === $validPassword) {
        session_regenerate_id(true);

        // Save login state inside session so other pages can identify the user.
        $_SESSION['username'] = $username;
        $_SESSION['login_time'] = date('Y-m-d H:i:s');
        $_SESSION['ip_address'] = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $_SESSION['expires_at'] = time() + $sessionTimeout;

        header('Location: dashboard.php');
        exit;
    } else {
        $error = 'Invalid username or password.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Session Login Demo</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <main class="page-shell">
        <section class="card">
            <p class="eyebrow">PHP Session Demo</p>
            <h1>Sign In</h1>
            <p class="subtext">Use <strong>dipto</strong> / <strong>696969</strong> to log in.</p>

            <?php if (isset($_GET['logged_out'])): ?>
                <div class="notice success">You were logged out successfully.</div>
            <?php endif; ?>

            <?php if (isset($_GET['session_expired'])): ?>
                <div class="notice error">Session expired after 30 seconds. Please log in again.</div>
            <?php endif; ?>

            <?php if ($error !== ''): ?>
                <div class="notice error"><?php echo htmlspecialchars($error, ENT_QUOTES, 'UTF-8'); ?></div>
            <?php endif; ?>

            <form method="post" class="form-grid" autocomplete="off">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter username">

                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter password">

                <button type="submit">Login</button>
            </form>
        </section>
    </main>
</body>
</html>
