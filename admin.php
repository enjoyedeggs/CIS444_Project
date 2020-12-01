<?php
	session_start();
	
	if (!isset($_SESSION["admin"])){
		header("location:admin_login.php");
		exit();
	}
	
	
?>
<!DOCTYPE html>
<!--
Project Name: Cougar Rescue Forum
Course: CIS444
Description: This file is the html for the admin home page.
			
-->

<html lang="en">
	<head>
		<!--Page Information-->
		<title>Cougar Rescue Forum</title>
		<meta charset="utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="cougar_rescue.css"/>
		<link rel="icon" href="images/cr_logo.png" type="image/x-icon" />
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<script type="text/javascript" src="admin.js"></script>
	</head>
	
	<body id="admin" class="pagestyle" onload="retrieveInformation();">
		<div id="navlist" class="navlist"> 
			<div>
				<img class = "logo"  src="images/cr_logo_plain.png" alt="Cougar Rescue Forum Logo"/>
			</div>
				<!-- seach bar left align -->
			<div class="search"> 
				<form action="admin.php" > 
					<input aria-label="search" name="keyword" type="text" placeholder=" Search forum topics" name="search" id="searchInput" required /> 
					<button name="searchsubmit" aria-label="search" type="submit"> <i class="fa fa-search" ></i> </button> 
				</form> 
			</div> 
			<!--Coming back to this-->
			<form id="logoutForm" method="post" action="admin_logout.php">
				<input name="logout" aria-label="logout" type="submit" class="logoutNav" value="Logout"/>
			</form>
			<a href="admin.php">Home</a> 
			  
		</div>

		<div class="adminpage">
			<h1 class="admin" id="adminheading">Admin Home Page</h1>
			
			<div id="searchResults">
				<!--When the user searches, the search results will be appended here-->
			</div>
			
			<div id="flaggedPosts">
				<h2 class="adminsubheadings">Flagged Posts</h2>
				
				<!--Page loads flagged posts from database-->
			</div>
			
			<div id="usersList">
				<h2 class="adminsubheadings">Students Registered for Cougar Rescue Forum </h2>
				<form  id="sorting" method="post" >
					<label class="adminsubheadings dropdownlbl" align="center" for="sortby">Sort By: 
					<select id="sortby" name="sortby" size="1">
					  <option value="default" selected="selected">Default</option>
					  <option value="fname">First Name</option>
					</select>
			
					<input  aria-label="sortmethod" type="submit" value="Apply" name="sortmethod" onclick="sortUsers()"/>
				</form>
				</label>
				<!--Page loads list of users from database-->
			</div>
		</div>
		<?php
			$db = mysqli_connect("db", "root", "test", "myDb");
			//$db = mysqli_connect("db", "group3", "g5tw9ShSexHH", "group3");
			if (mysqli_connect_errno()) {
				print "Connect failed: " . mysqli_connect_error();
				exit();
			}
			
			//Flagged Posts
			$flagged_query = "SELECT u.fname, u.lname, p.postID, p.content, p.subType, p.crsNumber FROM Users u, Posts p WHERE p.postStatus='flagged' AND u.email = p.userEmail;";
			$flagged = mysqli_query($db, $flagged_query);
			
			if (!$flagged) {
				print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
				exit();
			}
			$rows = array();
			while($r = mysqli_fetch_assoc($flagged)) {
				$values = array_values($r);
				$rows[] = $values;
			}
			
			print "<script type='text/javascript'>getFlagged(" . json_encode($rows) . ");</script>";
			//Enable/disable users
			$var = $_GET["user"];
			$status = $_GET["status"];
			$uemail = $var . "@cougars.csusm.edu";
			//print "<script type='text/javascript'>console.log('" . $status . "');</script>";
			//print '<script type="text/javascript"> console.log("'. gettype($status) .'");</script>';

			if (isset($var) && isset($status)) {
				//print "<script type='text/javascript'>console.log('" . $var . "');</script>";
				
				
				if ($status == "disabled"){
					$action = "enabled";
				}
				else if ($status == "enabled"){
					$action = "disabled";
				}

				$update_status = "UPDATE Users SET acctStatus = '". $action ."' WHERE email = '". $uemail. "';";
				//print '<script type="text/javascript"> console.log("'. $update_status . '");</script>';

				//print "<script type='text/javascript'>console.log('" . $uemail . "');</script>";
				$update = mysqli_query($db, $update_status);

				if (!$update) {
					print '<script type="text/javascript"> console.log("Error: the query could not be executed."' . mysqli_error() . ');</script>';
					exit();
				}
				//print '<script type="text/javascript"> console.log("here");</script>';

			}
			//Get Users
			$users_query = "SELECT CONCAT(u.fname, ' ', u.lname) as 'Student',
							GROUP_CONCAT(DISTINCT c.crsNumber SEPARATOR ', ') as 'Courses',
							u.email, COUNT(DISTINCT p.postID)  as '#
							of Posts', u.acctStatus
							FROM Users u, Posts p, Replies r, User_Courses c
							WHERE p.userEmail = u.email
							AND c.email = u.email
							GROUP BY u.email";
			if (isset($_GET["sortBy"]) && $_GET["sortBy"] == 'fname') {
				$users_query .= " ORDER BY fname;";
			}
			$users_query .= ";";
			print $users_query;
			$users = mysqli_query($db, $users_query);
			
			if (!$users) {
				print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
				exit();
			}
			$userrows = array();
			while($r = mysqli_fetch_assoc($users)) {
				$values = array_values($r);
				$userrows[] = $values;
			}
			print "<script type='text/javascript'>getUsers(" . json_encode($userrows) . ");</script>";
			
			if (isset($_GET["keyword"])){
				//Search Results
				$term = $_GET["keyword"];
				$search_query = "SELECT DISTINCT p.postID, p.title, p.content, p.subType, p.crsNumber,
								u.fname, u.lname
								FROM Posts p, Users u
								WHERE p.userEmail = u.email
								AND (content LIKE '%PHP%' OR title LIKE '%". $term . "%');";
								
				$search = mysqli_query($db, $search_query);		
				if (!$search) {
					print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
					exit();
				}
				$searchrows = array();
				while($r = mysqli_fetch_assoc($search)) {
					$values = array_values($r);
					$searchrows[] = $values;
				}
				//print json_encode($searchrows);
				print "<script type='text/javascript'>searchForum(" . json_encode($searchrows) . ");</script>";
								
			}	


			mysqli_close($db);
		?>
	</body>
	
</html>