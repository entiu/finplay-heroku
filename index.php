<?php 
    session_start(); 

    if (!isset($_SESSION['username'])) {
        $_SESSION['msg'] = "You must be logged in to use FinPlay.";
        header('location: login.php');
    }
    if (isset($_GET['logout'])) {
        session_destroy();
        unset($_SESSION['username']);
        header("location: login.php");
    }
?>

<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="style.css">
    <title>FinPlay</title>
</head>
<body class="body-index">
    <button class="btn-logout">
        <a href="index.php?logout='1'" class="text-white">
            <img src="img/ico-logout.svg" alt="ico-logout">
        </a>
    </button>
    <div class="container-index">
        <div class="news">Heya!</div>
        <button class="btn-index" >
            <a href="read.php">
                <img src="img/ico-episodes.svg" alt="ico-episodes">
                Episodes
            </a>
        </button>
        <button class="btn-index">
            <a href="#">
                <img src="img/ico-user.svg" alt="ico-user">
                Forum
            </a>
        </button>
        <button class="btn-index">
            <a href="#">
                <img src="img/ico-settings.svg" alt="ico-settings">
                Settings
            </a>
        </button>
        <button class="btn-index">
            <a href="#">
                <img src="img/ico-info.svg" alt="ico-info">
                About us
            </a>
        </button>
    </div>
</body>