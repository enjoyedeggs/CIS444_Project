<?php
	session_start();
	
?>
<!DOCTYPE html>
<!--
Project Name: Cougar Rescue Forum
Course: CIS444
Description: This file is the php for the index/home page.
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
		<h1>Login</h1>
		<div class="formstyle">
			<form id="loginForm" action="login.php" method="post" onsubmit="return login(this);">
				<p>
				<a href="login.php">
				<img src="images/cr_logo.png" alt="Cougar Rescue Forum Logo" /></a>
				</p>
				<p class="description">
				Welcome to the Cougar Rescue Forum. The Cougar Rescue Forum is a student-led,
				safe space for CSUSM students to ask course-related questions and receive 
				guidance and answers from their classmates. 
				</p>
				<p id="invalidMessage" name="invalidmsg" class="invalid">
				Invalid credentials. Please try again or click the &quot;Forgot Password&quot; link.
				</p>
				<label for="emailField">Email <br />
				<input class="inputstyle" type="email" placeholder="CSUSM Email" name="emailField" id="emailField" required /><br /></label>
				
				<label for="passField">Password <br />
				<input class="inputstyle" type="password" placeholder="Password" name="passField" id="passField" required /><br /></label>
				<a href="forgot_password.php">Forgot Password?</a><br /><br />
				<a href="register.php">Don't have an account? Register here!</a><br /><br />
				<input class="submitstyle" name="loginbtn" type="submit" value="Login" id="submitLogin" />
				<input class="adminlogin" type="button" value="Admin Login" id="adminLogin" onclick="goAdmin()"/>
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
				$query = "SELECT email, pass, acctStatus FROM Users WHERE email='"  . $email . "' AND pass='" . $pass . "' AND acctStatus='enabled';";
				
				//Execute query
				$result = mysqli_query($db, $query);
				

				if (!$result) {
					print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
					exit();
				}
				// Get the number of rows in the result
				$num_rows = mysqli_num_rows($result);
				$row = mysqli_fetch_assoc($result);
				if ($row[2] == 'disabled')
				{
					
					print "<script type='text/javascript'>errorCredentials('Your account is disabled. Please contact cougarrescue.noreply@gmail.com to resolve.'); </script>";
					exit();
				}
				else if ($num_rows == 0)
				{
				
					print "<script type='text/javascript'>errorCredentials('Invalid login credentials. Please try again or visit the Forgot Password page.'); </script>";
					exit();
					
				}
				else if ($num_rows == 1)
				{
					$_SESSION["user"] = $email;
					print "<script type='text/javascript'>";
					print "toMain();";
					print "</script>";
					exit();

				}
			}
			mysqli_close($db);
		?>
	</body>
	
</html>
