<?php
session_start();
date_default_timezone_set('Asia/Dhaka');

$sessionTimeout = 30;

if (!isset($_SESSION['username'])) {
    header('Location: index.php');
    exit;
}

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
    header('Location: index.php?session_expired=1');
    exit;
}

$username = $_SESSION['username'];
$loginTime = $_SESSION['login_time'] ?? 'not recorded';
$ipAddress = $_SESSION['ip_address'] ?? 'unknown';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <main class="page-shell">
        <section class="card">
            <p class="eyebrow">Dashboard</p>
            <h1>Welcome, <?php echo htmlspecialchars($username, ENT_QUOTES, 'UTF-8'); ?>!</h1>
            <p class="subtext">This page can read your session data even though it is a different PHP file.</p>

            <div class="session-box">
                <p><strong>Logged in as:</strong> <?php echo htmlspecialchars($username, ENT_QUOTES, 'UTF-8'); ?></p>
                <p><strong>Login time:</strong> <?php echo htmlspecialchars($loginTime, ENT_QUOTES, 'UTF-8'); ?></p>
                <p><strong>IP address:</strong> <?php echo htmlspecialchars($ipAddress, ENT_QUOTES, 'UTF-8'); ?></p>
                <p><strong>Session ID:</strong> <?php echo htmlspecialchars(session_id(), ENT_QUOTES, 'UTF-8'); ?></p>
            </div>

            <div class="actions">
                <a class="btn secondary" href="index.php">Back to Login</a>
                <a class="btn" href="logout.php">Logout</a>
            </div>
        </section>
    </main>
</body>
</html>
