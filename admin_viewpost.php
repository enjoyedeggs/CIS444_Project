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
Description: This file is the html for the admin view of a post.
			 The file contains the post and it's replies. The corresponding
			 javascript file dynamically fills the page information.
-->
<html lang="en" class="hidden-subforum">
    <head>
        <title>Cougar Rescue Forum</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="cougar_rescue.css"/>
		<link rel="icon" href="images/cr_logo.png" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<script type="text/javascript" src="admin_viewpost.js"> </script>
	</head>
    <body class="pagestyle" >
	<div id="whole-post">
	<div id="navlist" class="navlist">
			<div>
				<img class = "logo"  src="images/cr_logo_plain.png" alt="Cougar Rescue Forum Logo"/>
			</div>
			
			<button class="logoutNav" onclick="logout()">Logout</button>
			<a href="admin.php">Home</a>
        </div>
        <div class="vpcontainer" id="post">
            <div class="headerbox"  id="head">
                <h1 class="postheader"id="post-header">View Post</h1>
				
				
            </div>
            <div class="profileandbody" id="profileandbody">
                <div id="author-section" class="profilebox">
					<div id="profile-pic"></div>
                    <div class="indent" id="username"></div>
                </div>
                <div class="bodybox">
                    <div id="post-content"></div>
                </div>
            </div>
        </div>
		<div id="admin-section" class="post-admin-controls">
		<form  method="post">
			<button  class="adminlogin" type="submit" name="delete" id="disablebtn" onclick="deletePost(this.id)" >Delete Post </button>
		</form>
		<form  method="post">
			<input  name="lock" type="checkbox" name="Lock Post" id="lockpost" onchange="lockPost(this.id)" value="true"/><label for="lockpost">Lock Post</label>
		</form>
		</div>
		<div id="replies">
		
		</div>
        
	
	</div>
	<?php
		$db = mysqli_connect("localhost", "root", "", "cis444");
		//$db = mysqli_connect("db", "group3", "g5tw9ShSexHH", "group3");
		if (mysqli_connect_errno()) {
			print "Connect failed: " . mysqli_connect_error();
			exit();
		}
		$del_lock= $_GET["lock"];
		if (isset($del_lock)) {
			//print '<script type="text/javascript"> console.log("here");</script>';

			$del_query = "UPDATE Posts
							SET postStatus = 'locked'
							WHERE postID =".(int)$del_lock. ";";
						
			$result = mysqli_query($db, $del_query);
		
			if (!$result) {
				print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
				exit();
			}
			else {
				$course = $_GET["course"];
				$subforum = $_GET["subforum"];
				$postid = $_GET["postid"];
				print '<script type="text/javascript">';
				print 'console.log("' . $course . ',' . $subforum . ',' . $postid .'");';
				print '</script>';
				print '<script type="text/javascript">';
				print 'toPost("' . $course . '","' . $subforum . '","' . $postid .'");';
				print '</script>';
				
			}
		}
		
		$del_post = $_GET["post"];
		if (isset($del_post)) {
			$del_query = "DELETE FROM Posts
						WHERE postID = ".(int)$del_post.";";
						
			$result = mysqli_query($db, $del_query);
		
			if (!$result) {
				print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
				exit();
			}	
			else {
				print '<script type="text/javascript">';
				print 'toAdmin();';
				print '</script>';

			}
		}
		
		$del_reply = $_GET["reply"];
		if (isset($del_reply)) {
			$del_query = "DELETE FROM Replies
						WHERE replyID = ".(int)$del_reply." AND postID=" .(int)$_GET["postid"] .";";
						
			$result = mysqli_query($db, $del_query);
		
			if (!$result) {
				print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
				exit();
			}
		}
		

		$course = $_GET["course"];
		$subforum = $_GET["subforum"];
		$postid = $_GET["postid"];
		
		$get_post = "SELECT u.fname, u.lname, u.profilePicture, p.title, p.content,
					p.postStatus
					FROM Users u, Posts p
					WHERE u.email = p.userEmail
					AND p.postID = " . (int)$postid . ";";
					
		$result = mysqli_query($db, $get_post);
		
		if (!$result) {
			print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
			exit();
		}
		
		$rows = array();
		while($r = mysqli_fetch_assoc($result)) {
			$values = array_values($r);
			$rows[] = $values;
		}
		//print(json_encode($rows));
		print "<script type='text/javascript'>getInfo(" . json_encode($rows) . ");</script>";
			
		//Get replies
		$get_replies = "SELECT u.fname, u.lname, u.profilePicture, r.replyTitle,
			r.replyContent, r.replyStatus, r.replyId
			FROM Users u, Replies r, Posts p
			WHERE r.postID = p.postID
			AND r.replyAuthor = u.email
			AND p.postID = " . (int)$postid . ";";
			
		$result = mysqli_query($db, $get_replies);
		if (!$result) {
			print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
			exit();
		}
		
		$rows = array();
		while($r = mysqli_fetch_assoc($result)) {
			$values = array_values($r);
			$rows[] = $values;
		}
		//print(json_encode($rows));
		print "<script type='text/javascript'>getReplies(" . json_encode($rows) . ");</script>";
			
	?>
    </body>
</html>
