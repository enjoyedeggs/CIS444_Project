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
Description: This file is the html for the student view of a post.
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
    </head>
    <body class="pagestyle">
	<div id="whole-post">
	<div id="navlist" class="navlist">
			<div>
				<img class = "logo"  src="images/cr_logo_plain.png" alt="Cougar Rescue Forum Logo"/>
			</div>
			
			<form id="logoutForm" method="post" action="logout.php">
				<input name="logout" aria-label="logout" type="submit" class="logoutNav" value="Logout"/>
			</form>
			<a href="search.php">Search</a>
			<a href="view_profile.php">Profile</a>
			<a href="main.php">Home</a>
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
            <div id="user-controls" class="viewprofilebuttons">
			<input  type="checkbox"  name="flagged" id="flag"/>
			<label class="flag-post floatright" for="flag" id="flaglabel">Flag Post</label>
                
			<button  id="rplybutton" onclick="newReply()">Reply to Post</button>
            </div>
        </div>
		<div id="replies">
		
		</div>
        <script type="text/javascript" src="viewpost.js"> </script>
		<noscript>Your browser does not support JavaScript</noscript>
	</div>
    </body>




    <!-- PHP --> 
    <?php
    /***********Change***************************************** */
    //$db = mysqli_connect("localhost", "root", "", "myDb");
	$db = mysqli_connect("db", "root", "test", "myDb");	
    if (mysqli_connect_errno()) {
        print "Connect failed: " . mysqli_connect_error();
        exit();
    }

    $course = $_GET["course"];
    $subforum = $_GET["subforum"];
    $postid = $_GET["postid"];
	$del_flag= $_GET["flag"];
	if (isset($del_flag)) {
		print '<script type="text/javascript"> console.log("here");</script>';
		$del_query = "UPDATE Posts
					SET postStatus = 'flagged'
					WHERE postID =".(int)$del_flag. ";";
						
		$result = mysqli_query($db, $del_query);
		
		if (!$result) {
			print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
			exit();
		}
		else {
			//print '<script type="text/javascript">';
			//print 'console.log("' . $course . ',' . $subforum . ',' . $postid .'");';
			//print '</script>';
			print '<script type="text/javascript">';
			print 'toPost("' . $course . '","' . $subforum . '","' . $postid .'");';
			print '</script>';
			
		}
	}
	//print '<script type="text/javascript"> console.log("'. $course . '");</script>';
	//print '<script type="text/javascript"> console.log("'. $subforum . '");</script>';
	//print '<script type="text/javascript"> console.log('. $postid . ');</script>';
	//print $course;
	//print $subforum;
	//print $postid;
    getPostInfo($postid,$db); 
    getPostReplies($postid,$db); 
    

/***************Gets post information*************************************/
    function getPostInfo($postid,$db){
        $sql_query = "SELECT u.fname,u.lname,u.profilePicture,p.userEmail,p.title,p.content,p.postStatus
        FROM Users u, Posts p
        WHERE p.userEmail = u.email
        AND p.postID =" .(int)$postid.";";

        $result = mysqli_query($db,$sql_query);

        if(!mysqli_num_rows($result))
        {
            print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
			exit();
        }
        else{

        $row = mysqli_fetch_array($result);
        echo "<script type = 'text/javascript'>getInfo(" .json_encode($row) .");</script>";
        }
    }
/*****************************************************/


/*************Getting Replies ************************/
function getPostReplies($postid,$db){
    $sql_query = "SELECT u.fname, u.lname, u.profilePicture, r.replyTitle, r.replyContent, r.replyStatus
    FROM Users u, Replies r, Posts p 
    WHERE r.postID = p.postID
    and r.replyAuthor = u.email
    AND r.postID = " .(int)$postid.";";

    $result = mysqli_query($db,$sql_query);
    if(!$result)
    {
        exit();
    }
    
    $rows = array(); 
    
    while($r = mysqli_fetch_assoc($result)){
        $values = array_values($r);
        $rows[] = $values;
    }
    print "<script type = 'text/javascript'>getReplies(".json_encode($rows).");</script>";          
}

    ?>
</html>
