<?php
	session_start();
	
?>
<!DOCTYPE html>
<!--
Project Name: Cougar Rescue Forum
Course: CIS444
Description: This file is the html for the index/home page.
			 The file contains the login form for the user as well
			 as forgot password and registration links.
-->

<html lang="en">
	<head>
		<!--Page Information-->
		<title>Cougar Rescue Forum</title>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link type="text/css" rel="stylesheet" href="cougar_rescue.css"/>
		<link rel="icon" href="images/cr_logo.png" type="image/x-icon" />
		<script type="text/javascript" src="login.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
	</head>
	<body class="pagestyle">
		<h1>Administrator Login</h1>
		<div class="formstyle">
			<form id="loginForm" action="admin_login.php" method="post" onsubmit="return login(this)">
				<p>
				<a href="admin_login.php">
				<img src="images/cr_logo.png" alt="Cougar Rescue Forum Logo" /></a>
				</p>
				<p class="description" id="description">
				Welcome to the Cougar Rescue Forum. This is the administrator login. If you are not an administrator please
				visit the <a href="login.php">Cougar Rescue Forum</a> to login or register as a student.
				</p>
				<label for="emailField">Email <br />
				<input class="inputstyle" type="email" placeholder="CSUSM Email" name="emailField" id="emailField" required /><br /></label>
				
				<label for="passField">Password <br />
				<input class="inputstyle" type="password" placeholder="Password" name="passField" id="passField" required /><br /></label>
				<a href="forgot_password.php">Forgot Password?</a><br /><br />
				<input class="submitstyle" name="loginbtn" type="submit" value="Login" id="submitLogin" />
				</form>
		</div>
			<?php
		
			$db = mysqli_connect("db", "root", "test", "myDb");
			//$db = mysqli_connect("db", "group3", "g5tw9ShSexHH", "group3");
			if (mysqli_connect_errno()) {
				print "Connect failed: " . mysqli_connect_error();
				exit();
			}
			if (isset($_POST['loginbtn'])){
			//Get login credentials that user entered
				$email = $_POST['emailField'];
				$pass = $_POST['passField'];
				
				//Create query
				$query = "SELECT email, pass, acctType FROM Users WHERE email='"  . $email . "' AND pass='" . $pass . "';";
				
				//Execute query
				$result = mysqli_query($db, $query);
				

				if (!$result) {
					print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
					exit();
				}
				
				// Get the number of rows in the result
				$num_rows = mysqli_num_rows($result);
				$row = mysqli_fetch_assoc($result);

				if ($num_rows == 0)
				{
				
					print "<script type='text/javascript'>errorCredentials('Invalid login credentials. Please try again or visit the Forgot Password page.'); </script>";
					exit();
					
				}
				if ($row['acctType'] != 'admin') {
					print "<script type='text/javascript'>errorCredentials('This is a student account. Please use the student login.'); </script>";
					exit();
				}
				
				else if ($num_rows == 1 && $row['acctType'] == 'admin')
				{
					
					$_SESSION["admin"] = $email;
					print "<script type='text/javascript'>";
					print "toAdmin();";
					print "</script>";
					exit();

				}
			}
			mysqli_close($db);
		?>
	</body>
	
</html>
