<?php
	session_start();
	
?>
<!DOCTYPE html>
<!--
Project Name: Cougar Rescue Forum
Course: CIS444
Description: This file is the html for the registration page.
			 The file contains input fields for the user to enter
			 their information to create an account.
-->

<html lang="en">
	<head>
		<!--Page Information for Registration-->
		<title>Cougar Rescue Forum</title>
		<meta charset="utf-8"/>
		<link type="text/css" rel="stylesheet" href="cougar_rescue.css"/>
		<link rel="icon" href="images/cr_logo.png" type="image/x-icon" />
		<script type="text/javascript" src="register.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>

	</head>
	<body class="pagestyle">
		<h1>Cougar Rescue Registration</h1>
		<div class="formstyle">
			<form id="registerForm" action="register.php" method="post" onsubmit="return validateFields(this)">
				<p>
				<a href="login.php">
				<img src="images/cr_logo.png" alt="Cougar Rescue Forum Logo" /></a>
				</p>
				<p>
				<label for="fnameField">First Name <br />
				<input class="inputstyle" type="text" placeholder="First Name" name="fnameField" id="fnameField" required /><br /></label>
				
				<label for="lnameField">Last Name <br />
				<input class="inputstyle" type="text" placeholder="Last Name" name="lnameField" id="lnameField" required /><br /></label>
				
				<label for="emailField">CSUSM Email <br />
				<input class="inputstyle" type="email" placeholder="CSUSM Email" name="emailField" id="emailField" required /><br /></label>
				
				<label for="passField">Password <br />
				<input class="inputstyle" type="password" placeholder="Password" name="passField" id="passField" required /><br /></label>
				
				<label for="cpassField">Confirm Password <br />
				<input class="inputstyle" type="password" placeholder="Confirm Password" name="cpassword" id="cpassField" required /><br /></label>
				
				<input class="submitstyle" type="submit" name="register" value="Register!" id="submitRegister"/>
				</p>
			</form>
		</div>
		<?php
				$db = mysqli_connect("db", "root", "test", "myDb");
				//$db = mysqli_connect("db", "group3", "g5tw9ShSexHH", "group3");
				if (mysqli_connect_errno()) {
					print "Connect failed: " . mysqli_connect_error();
					exit();
				}	
				if (isset($_POST['register'])){
					//Get registration information
					$fname = $_POST["fnameField"];
					$lname = $_POST["lnameField"];
					$email = $_POST["emailField"];	
					$pass = $_POST["passField"];
					
					//First check if email is in use
					$email_query = "SELECT email FROM Users WHERE email LIKE '" . $email . "';";
					
					$email_in_use = mysqli_query($db, $email_query);
					if (!$email_in_use) {
						print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
						exit();
					}
					$num_rows = mysqli_num_rows($email_in_use);
					if ($num_rows == 1) {
						print "<script type='text/javascript'>";
						print "valid(false);";
						print "</script>";
					}
					else if ($num_rows == 0) {
						print "<script type='text/javascript'>";
						print "valid(true);";
						print "</script>";
						
						$register_query = "INSERT INTO Users (email, fname, lname, profilePicture, signature, pass, acctStatus, acctType, adminEmail)
										VALUES ('". $email ."', '" . $fname . "', '" . $lname . "', NULL, NULL, '".$pass ."','enabled', 'student',
										(SELECT adminUser.email FROM (SELECT email from Users WHERE acctType = 'admin') as adminUser));";
						
						//Insert user into db - execute query
						$result = mysqli_query($db, $register_query);
						if (!$result) {
							print '<script type="text/javascript"> alert("Error: could not create account."' . mysqli_error() . ');</script>';
							exit();
						}
						else {
							$_SESSION["user"] = $email;
							print "<script type='text/javascript'>";
							print "toMain();";
							print "</script>";
							exit();
						}

					}
				}
				mysqli_close($db);
		?>
	</body>
	
</html>
