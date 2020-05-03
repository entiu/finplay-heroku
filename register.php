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
        <img src="img/leo-reg.svg" alt="leo-reg">
        <h1 class="h-reg">New around?</h1>
        <p class="p-reg">Seems like it's the first time you open FinPlay on this device.</p>
        <form method="post" action="register.php">
            <?php include('errors.php'); ?>
            <input name="username" type="text" class="input-reg" placeholder="Username">
            <input name="email" type="email" class="input-reg" placeholder="E-mail">
            <input name="pass-1" id="pass-1" type="password" class="input-reg" placeholder="Password">
            <input name="pass-2" id="pass-2" type="password" class="input-reg" placeholder="Come again?">
            <div class="toggle-pass">
                <label class="switch">
                    <input type="checkbox" onclick="togglePass()">
                    <span class="slider round"></span>
                </label>
                <label for="toggle-pass">Show passwords.</label>
            </div>
            <button type="submit" name="reg-user">Sign me up</button>
            <p class="p-reg">Already signed up? <a class="a-reg" href="login.php">Log in.</a></p>
        </form>
    </div>
</body>
</html>