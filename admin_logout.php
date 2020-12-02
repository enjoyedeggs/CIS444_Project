<?php
	session_start();
	
	$_SESSION['admin'] = NULL;
	if($_SESSION['admin'] == NULL){
		header("location:admin_login.php");
	}
	else{
		header("location:admin.php");
	}


?>