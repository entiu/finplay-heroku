<?php include('server.php') ?>

<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="style.css">
    <title>FinPlay</title>
    <script src="script.js"></script>
</head>
<body>
    <div class="container">
        <img src="img/leo-log.svg" alt="leo-log">
        <h1 class="h-reg">Hop in!</h1>
        <p class="p-reg">Sign in and let the story begin.</p>
        <form method="post" action="login.php">
            <?php include('errors.php') ?>
            <input name="username" type="text" class="input-reg" placeholder="Username">
            <input name="password" id="password" type="password" class="input-reg" placeholder="Password">
            <div class="toggle-pass">
                <label class="switch">
                    <input type="checkbox" onclick="togglePassLogIn()">
                    <span class="slider round"></span>
                </label>
                <label for="toggle-pass">Show password.</label>
            </div>
            <button type="submit" name="log-user">Log me in</button>
            <p class="p-reg">Don't have an account? <a class="a-reg" href="register.php">Register.</a></p>
        </form>
    </div>
</body>
</html>