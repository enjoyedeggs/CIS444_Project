<?php
	session_set_cookie_params(30 * 60, "/; samesite=Strict", $_SERVER['HTTP_HOST'], 1, 0);
	session_start();
	
?>
<!DOCTYPE html>
<!--
Project Name: Cougar Rescue Forum
Course: CIS444
Description: This file is the html for the forgot password page.
			 The file contains a single input field for the user
			 to enter their account email to reset their password.
-->

<html lang="en">
	<head>
		<!--Page Information for Forgot Password-->
		<title>Cougar Rescue Forum</title>
		<meta charset="utf-8"/>
		<link type="text/css" rel="stylesheet" href="cougar_rescue.css"/>
		<link rel="icon" href="images/cr_logo.png" type="image/x-icon" />
		<script type="text/javascript" src="forgot_password.js"></script>
		 <script type="text/javascript" src="https://smtpjs.com/v3/smtp.js"></script> 
	</head>
	<body class="pagestyle">
		<h1>Forgot Password </h1>
		<div class="formstyle">
			<form id="fpForm" action="forgot_password.php" method="post" >
				<p>
				<a href="login.php">
				<img src="images/cr_logo.png" alt="Cougar Rescue Forum Logo" /></a>
				</p>
				<p class="description">
				Please enter the email address for your account below. You will receive an
				email with a link to reset your password. If you do not receive an email please try again.
				</p>
				
				<div class="inputcontainer" id="forgotpass-container">
				<p id="invalidMessage" name="invalidmsg" class="invalid">
				This email is not associated with any account. Register to create an account.
				</p>
				<label for="emailField">Email Address <br />
				<input class="inputstyle" type="email" name="emailfld" placeholder="CSUSM Email" id="emailField" required /></label><br />
				<input class="submitstyle" name="fpbtn" type="submit" value="Email Me" id="emailButton"/>
				</div>
			</form>
			<?php
				$db = mysqli_connect("db", "root", "test", "myDb");
				
				//$db = mysqli_connect("db", "group3", "g5tw9ShSexHH", "group3");
				if (mysqli_connect_errno()) {
					print "Connect failed: " . mysqli_connect_error();
					exit();
				}	
				if (isset($_POST['fpbtn'])){
					//Get email
					$email = $_POST["emailfld"];
					
					//Create query
					$query = "SELECT email FROM Users WHERE email='" . $email . "';";
					
					//Execute query
					$result = mysqli_query($db, $query);
					
					if (!$result) {
						print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
						exit();
					}
					
					$num_rows = mysqli_num_rows($result);
					if ($num_rows == 0) {
						
						print "<script type='text/javascript'>";
						print "invalidEmail('This email is not associated with any account. Register to create an account.');";
						print "</script>";
						
					}
					else {
						//Reset Password
						$reset_pass = "UPDATE Users SET pass = '588ef7285d67a91db412fbd19e99f81091a05f16229b6653a200ec3719daa3d6' WHERE email='" . $email ."';";
						$success = mysqli_query($db, $reset_pass);
						if (!$success) {
							print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
							exit();
						}
						
						$to = $email;
						$subject = "Cougar Rescue Password Reset";
						//$headers = "From: cougarrescue.noreply@gmail.com";

						
						// the message
						$msg = "If you did not request to reset your password, please ignore this email. " .
						"Your temporary password for Cougar Rescue is: 'cougarrescuereset'. Please login and reset your password in your profile ASAP.";
						
						// Always set content-type when sending HTML email
						$headers = "MIME-Version: 1.0" . "\r\n";
						$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
						$headers .= 'From: <cougarrescue.noreply@gmail.com>' . "\r\n";
						
						// use wordwrap() if lines are longer than 70 characters
						$msg = wordwrap($msg,70);
						
						$returnval = mail($to, $subject, $msg, $headers);
						if ($returnval != true) {
							print "<script type='text/javascript'>";
							print "invalidEmail('Error sending email. Please try again.');";
							print "</script>";
						}
						else {
							print "<script type='text/javascript'>";
							print "goLogin();";
							print "</script>";
						}
						

					}
				}
	
				mysqli_close($db);
			?>
		</div>
	</body>
	
</html>
