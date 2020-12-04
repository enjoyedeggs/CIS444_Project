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
Description: This file is the html for the update/edit profile page.
			 The file contains the layout for the edit profile page, and the
			 corresponding javascript pre-fills the user's information dynamically
			 once the database is implemented.
-->
<html lang="en">

	<head>
		<title>Cougar Rescue Forum</title>
		<meta charset="utf-8"/>
		<link rel="icon" href="images/cr_logo.png" type="image/x-icon" />
        <script type="text/javascript" src="nav.js"></script>
        <script type="text/javascript" src="edit_profile.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
        <link rel="stylesheet" href="cougar_rescue.css"/>
	</head>
	
	<body id="edit_profile" class="pagestyle" >
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
		
		
		<form method="post" enctype="multipart/form-data" onsubmit="return saveUpdates(this);">
        <div id="profile_info_div" class="forum-div profile-size">
			<h1>Edit My Profile</h1>
			<p class="invalid" id="error">
			</p>
            <div class="profile-picture">
				<div id="profile-picture-div" >
				</div>
			</div>
            <div class="profile-format">
                <div class="sub-title floatleft">
                    <div id="user-info">
                        <p  class="profile-text border-bottom-div">Personal Information </p>
						<div id="personal-info"></div><br />
						<input aria-label="profile-picture"  class="input-picture" type="file" id="pictureInput" 
						name="pictureInput" accept="image/png, image/jpeg" onchange="changePicture()"><br><br>
						
						<label for="fname">First Name:
						<input class="edit-input" name="fname" id="fname" type="text" /></label><br /><br />
						
						<label for="lname">Last Name:
						<input class="edit-input" name="lname" id="lname" type="text" /></label><br /><br />
						
						<label for="email">CSUSM Email: 
						<input class="edit-input" name="email" id="email" type="text"  disabled /></label>
						
                        <!--JS-->
                    </div>

					<div id="courses">
                        <p class="profile-text border-bottom-div">My Courses</p>
						<textarea aria-label="courses" name="courses" class="edit-input" rows="5" cols="30" id="courses-list" >
						
						</textarea><br />
                        <!--JS-->
                    </div>
					<div id="signature-div">
                        <p class="profile-text border-bottom-div">Signature</p>
						<textarea aria-label="signature" name="signature" id="signature" class="edit-input" rows="5" cols="30" ></textarea><br />
					</div>
					
					<div id="password-div">
					<form method="post" >
                        <p class="profile-text border-bottom-div">Change Password? </p>
						<label for="change-pass"><input onchange="makeVisible();" type="checkbox" id="change-pass" name="changepass" value="Yes"/>Yes</label>
						<div id="change-pass-div" class="hidden-subforum">
							<label for="oldpass"> Old Password:
							<input type="password" name="oldpass" id="oldpass" class="edit-input"  /></label><br /><br />
							
							<label for="newpass"> New Password:
							<input type="password" name="newpass" id="newpass" class="edit-input"  /></label><br /><br />
							
							<label for="confpass"> Confirm Password:
							<input type="password" id="confpass" name="confpass" class="edit-input"  /></label><br /><br />
						<input type="submit" name="change" id="changbtn" value="Change Password" aria-label="change" class="submitstyle" onclick="saveChanges();"/>
						</div>
						
					</form>
					</div>
					<div>
						<input id="saveButton"
							class="edit-buttons-button"
							type="submit"
							value="Save Profile"
							name="saveButton"
							/>
						<input id="cancelButton"
							class="adminlogin"
							type="button"
							value="Cancel"
							onclick="window.location.href='view_profile.php'"
							/>
					</div>
	
				</form>
                </div>
            </div>

        </div>
		
		 
		
		
		<?php
			$db = mysqli_connect("db", "root", "test", "myDb");
			//$db = mysqli_connect("localhost", "root", "", "test");
			if (mysqli_connect_errno()) {
				print "Connect failed: " . mysqli_connect_error();
				exit();
			}
			
			$email = $_SESSION["user"];
			$query = "SELECT u.fname, u.lname, u.email, u.profilePicture, u.signature, GROUP_CONCAT(uc.crsNumber SEPARATOR ', ') as “Courses” 
			FROM Users u, User_Courses uc WHERE u.email = uc.email AND u.email ='". $email."';";
			
			$result = mysqli_query($db, $query);
			
			
			$username = substr($_SESSION["user"], 0, 8);
			
		
			if (!$result) {
				print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
				exit();
			}
			$rows = array();
			while($r = mysqli_fetch_assoc($result)) {
				$values = array_values($r);
				$rows[] = $values;
			}
			$orig_courses = explode(', ', $rows[0][5]);
			$profile_pic = $rows[0][3];
			
			print '<script type="text/javascript">retrieveInformation('. json_encode($rows) . ');</script>';

			$email = $_SESSION["user"] ;
			$check_pass = "SELECT email FROM Users WHERE email='" . $email . "' AND pass='" . $_POST["oldpass"] . "';";
			//print $check_pass;
			if (isset($_POST["change"])) {	
				$pass = $_POST['oldpass'];
				$npass = $_POST['newpass'];	
				
				//blank field
				if (($npass == "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" || $_POST["confpass"] == "") || $npass != $_POST["confpass"] ) {
					print '<script type="text/javascript">invalidPass(false, "Please confirm your new password and ensure it matches.");</script>';
					exit();
				}
				else {
					print '<script type="text/javascript">encryptPass();</script>';

				}
				$is_valid = mysqli_query($db, $check_pass);
				$row = mysqli_fetch_assoc($is_valid);
				//print $row['email'];
				if ($row['email'] != $_SESSION["user"]) {
					print '<script type="text/javascript">invalidPass(false, "The password entered in the Old Password field is incorrect");</script>';
				}
				else {
					$change_pass = "UPDATE Users SET pass='" . $_POST["newpass"] . "' WHERE email='" . $email . "';";
					$changed = mysqli_query($db, $change_pass);
					if (!$changed) {
						print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
						exit();
					}
				}
				if (!isset($_POST['saveButton'])) {
					//print '<script type="text/javascript"> toProfile();</script>';
				}
			}
			if (isset($_POST['saveButton'])){
				
				$fname = $_POST['fname'];
				$lname = $_POST['lname'];
				$courses = explode(', ', $_POST['courses']);
				$signature = $_POST['signature'];
				$pictureLink= trim($_POST["pictureInput"]);
				//print $pictureLink;

				

				//print $orig_courses;
										//delete student from all courses
				$remove = "DELETE FROM User_Courses WHERE email='" . $email . "';";
				$rem_res = mysqli_query($db, $remove);
				for ($i = 0; $i < count($courses); $i++) {
						//if new course, first check if course exists
						$query = 'SELECT crsNumber from Courses WHERE crsNumber="'.$courses[$i].'";';
						$exists = mysqli_query($db, $query);
						if (!$exists) {
							print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
							exit();
						}
						$row = mysqli_fetch_assoc($exists);
						if ($row['crsNumber'] != $courses[$i]) {
							//if course doesn't exist, create it
							$insert = "INSERT INTO Courses VALUES ('" . $courses[$i] . "');";
							$created = mysqli_query($db, $insert);
							if (!$created) {
								print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
								exit();
							}
							
						}

						
						//then add student to course
						$new_student = "INSERT INTO User_Courses (email, crsNumber) VALUES ('". $email . "', '" . $courses[$i] . "');";
						//print $new_student;
						$inserted = mysqli_query($db, $new_student);
						if (!$inserted) {
								print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
								exit();
						}
						
					
				}
				if(!isset($_FILES['pictureInput']) || $_FILES['pictureInput']['error'] == 4){
					$target_file = $profile_pic;
					//print "here";
				
				} else{
					
					//upload the image to the server
					$target_dir = "users/";
					$target_file = $target_dir . $username;
					$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
					$actual_name = pathinfo($target_file,PATHINFO_FILENAME);
					$original_name = $actual_name;
					$extension = pathinfo($target_file, PATHINFO_EXTENSION);
					
					
					// Check if file already exists
					//file_exists($target_file)) {
					//$target_file = $target_dir . $actual_name . "." . $extension;
					//print '<script type="text/javascript">';
					//print 'console.log("' . $target_file . '");';
					//print '</script>';
				
					if (move_uploaded_file($_FILES["pictureInput"]["tmp_name"], $target_file)) {
						//print "The file ". htmlspecialchars( basename( $_FILES["pictureInput"]["name"])) . " has been uploaded.";
					}
					else{
						print '<script type="text/javascript">';
						print 'alert("Sorry, there was an error uploading your file. Please try again later.");';
						print '</script>';
						$target_file = $profile_pic;
					
					}
					//$filename = $username . '.' . $extension;
				}
				//print $check_pass;
				$set_edit = "UPDATE Users
								SET 
								fname = '".$fname."', lname = '".$lname."', signature = '".$signature."', profilePicture = '". str_replace('users/', '', $target_file) ."'
								
				 WHERE email = '".$email."';";
					
				$result = mysqli_query($db, $set_edit);
				//print $set_edit;
				//$result = mysqli_query($db, $set_edit);
		
				if (!$result) {
					print '<script type="text/javascript"> alert("Error: the query could not be executed."' . mysqli_error() . ');</script>';
					exit();
				}
				print '<script type="text/javascript"> toProfile();</script>';
				
			}
			


		?>
	</body>
</html>