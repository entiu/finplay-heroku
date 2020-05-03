<?php
session_start();

// Initialize variables
$username = "";
$email = "";
$errors = array(); 

// Connect to the database
$db = mysqli_connect('localhost', 'root', 'entiu', 'finplay');

/******* REGISTRATION *******/
/****************************/
if (isset($_POST['reg-user'])) {
  // Receive all input values from the form:
  $username = mysqli_real_escape_string($db, $_POST['username']);
  $email = mysqli_real_escape_string($db, $_POST['email']);
  $password_1 = mysqli_real_escape_string($db, $_POST['pass-1']);
  $password_2 = mysqli_real_escape_string($db, $_POST['pass-2']);

  // Ensure that the form is correctly filled:
  if (empty($username)) { array_push($errors, "Username is required."); }
  if (empty($email)) { array_push($errors, "E-mail is required."); }
  if (empty($password_1)) { array_push($errors, "Password is required."); }
  if ($password_1 != $password_2) {	array_push($errors, "Passwords must match."); }

  // Check the database beforehand to make sure the username and/or e-mail are not already registered
  $user_check_query = "SELECT * FROM users WHERE username='$username' OR email='$email' LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);

  if ($user) {
    if ($user['username'] === $username) {
      array_push($errors, "Username already exists.");
    }

    if ($user['email'] === $email) {
      array_push($errors, "E-mail already exists.");
    }
  }

  // Finally, if there are no errors in the form, register the new user:
  if (count($errors) == 0) {
    $password = md5($password_1); // Encrypt the password
    $query = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
    mysqli_query($db, $query);
    $_SESSION['username'] = $username;
    header('location: index.php');
  }
}

/******* LOG IN *******/
/**********************/
if (isset($_POST['log-user'])) {
    $username = mysqli_real_escape_string($db, $_POST['username']);
    $password = mysqli_real_escape_string($db, $_POST['password']);
  
    if (empty($username)) {
        array_push($errors, "Username is required.");
    }
    if (empty($password)) {
        array_push($errors, "Password is required.");
    }
  
    if (count($errors) == 0) {
        $password = md5($password);
        $query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
        $results = mysqli_query($db, $query);
        if (mysqli_num_rows($results) == 1) {
          $_SESSION['username'] = $username;
          header('location: index.php');
        } else {
            array_push($errors, "Wrong username or password.");
        }
    }
  }
?>