<?php
	session_start();
	
	if (!isset($_SESSION["user"])){
		header("location:login.php");
		exit();
	}
?>

<!--
Project Name: Cougar Rescue Forum
Course: CIS444
Description: This file is the html for a student's profile page.
			 The file contains the profile layout and the corresponding
			 javascript dynamically fills the information from the database
			 which will be implemented later.
-->
<html lang="en">

	<head>
		<title>Cougar Rescue Forum</title>
		<meta charset="utf-8"/>
		<link rel="icon" href="images/cr_logo.png" type="image/x-icon" />
        <script type="text/javascript" src="nav.js"></script>
        <script type="text/javascript" src="view_profile.js"></script>
        <link rel="stylesheet" href="cougar_rescue.css"/>
	</head>
	
	<body id="view_profile" class="pagestyle">
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

        <div id="profile_info_div" class="forum-div profile-size">
			<h1>My Profile</h1>

            <div class="profile-picture">
				<div id="profile-picture-div" >
				</div>
			</div>
            <div class="profile-format">
                <div class="sub-title floatright">
                    <div id="user-info">
                        <p class="profile-text border-bottom-div">Personal Information <a href="edit_profile.php" class="nolink small-font floatright" >
				Edit Profile<!--<img src="images/edit.png" alt="Edit Profile" class="edit-icon ">--></a></p>
                        <!--JS-->
                    </div>

					<div id="courses">
                        <p class="profile-text border-bottom-div">My Courses</p>
                        <!--JS-->
                    </div>
					<div id="signature">
                        <p class="profile-text border-bottom-div">Signature</p>
					</div>
                </div>
            </div>

        </div>
		<?php
			$db = mysqli_connect("db", "root", "test", "myDb");
			//$db = mysqli_connect("db", "group3", "g5tw9ShSexHH", "group3");
			if (mysqli_connect_errno()) {
				print "Connect failed: " . mysqli_connect_error();
				exit();
			}
			
			$email = $_SESSION["user"];
			//print $email;
			$query = 'SELECT u.fname, u.lname, u.email, u.profilePicture, u.signature FROM Users u WHERE  u.email ="' . $email . '";';
			//print $query;			
			$result = mysqli_query($db, $query);
		
			if (!$result) {
				print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
				exit();
			}
			$rows = array();
			while($r = mysqli_fetch_assoc($result)) {
				$values = array_values($r);
				$rows[] = $values;
			}
			//print json_encode($rows);
			
			$crs = 'SELECT GROUP_CONCAT(uc.crsNumber SEPARATOR ", ") as “Courses” FROM Users u, User_Courses uc WHERE u.email = uc.email AND u.email ="'. $email . '";';
			$result = mysqli_query($db, $crs);
		
			if (!$result) {
				print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
				exit();
			}
			$courses = array();
			while($r = mysqli_fetch_assoc($result)) {
				$values = array_values($r);
				$courses[] = $values;
			}
			//print json_encode($courses);
			print '<script type="text/javascript"> retrieveInformation(' . json_encode($rows) . ',' . json_encode($courses) . ');</script>';

			mysqli_close($db);
		?>
    </body>
</html>