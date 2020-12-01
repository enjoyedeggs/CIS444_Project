<?php
	session_start();
	
	if (!isset($_SESSION["user"])){
		header("location:login.php");
		exit();
	}
	
	
?>
<!DOCTYPE html>
<!--
Project Name: Cougar Rescue Forum
Course: CIS444
Description: This file is the html/php for the main/home page.
			 The file contains the layout for the student's home page,
			 which consists of their course forums and subforum overviews.
			 This page is filled dynamically with the corresponding javascript
			 file.
-->
<html lang="en">

	<head>
		<title>Cougar Rescue Forum</title>
		<meta charset="utf-8"/>
		<script src='https://kit.fontawesome.com/a076d05399.js'></script>
		<link rel="icon" href="images/cr_logo.png" type="image/x-icon" />
		<script type="text/javascript" src="nav.js"></script>
		<script type="text/javascript" src="main.js"></script>
		<link rel="stylesheet" href="cougar_rescue.css"/>
	</head>
	
	<body id="admin" class="pagestyle" onload="writeTable();">
		<div id="navlist" class="navlist">
			<div>
				<img class = "logo"  src="images/cr_logo_plain.png" alt="Cougar Rescue Forum Logo"/>
			</div>
			<form id="logoutForm" method="post" action="logout.php">
				<input name="logout" aria-label="logout" type="submit" class="logoutNav" value="Logout"/>
			</form>
			<a href="search.html">Search</a>
			<a href="view_profile.html">Profile</a>
			<a href="main.php">Home</a>

		</div>
		<div class="forum-div" id="forum-div">
			<h1> Welcome to the Cougar Rescue Forum!</h1>
			
		</div>
		
		<?php
			$db = mysqli_connect("db", "root", "test", "myDb");
			//$db = mysqli_connect("db", "group3", "g5tw9ShSexHH", "group3");
			if (mysqli_connect_errno()) {
				print "Connect failed: " . mysqli_connect_error();
				exit();
			}
			
			//Create query
			$email = $_SESSION["user"];
			$query = "SELECT s.crsNumber, s.subType,
						(SELECT COUNT(DISTINCT p.postID) + COUNT(DISTINCT r.replyID)
						FROM Posts p, Replies r WHERE s.subType = p.subType AND
						s.crsNumber = p.crsNumber AND r.postID = p.postID)
						as 'Posts',
						MAX(p.postDate) as 'Date'
						FROM Subforums s, Posts p, Replies r, Users u, User_Courses c
						WHERE r.postID = p.postID
						AND u.email = '". $email ."'
						AND u.email = c.email
						AND s.crsNumber = c.crsNumber
						GROUP BY s.crsNumber, s.subType;";
						
			//Execute query
			$result = mysqli_query($db, $query);
				
			if (!$result) {
				print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
				exit();
			}
			// Encode query results to send to JS
			// Get the number of rows in the result
			//$num_rows = mysqli_num_rows($result);
			//$num_fields = mysqli_num_fields($result);
			$rows = array();
			while($r = mysqli_fetch_assoc($result)) {
				$values = array_values($r);
				$rows[] = $values;
			}
//print(json_encode($rows));
			print "<script type='text/javascript'>writeTable(" . json_encode($rows) . ");</script>";
			mysqli_close($db);
		?>

	</body>
</html>