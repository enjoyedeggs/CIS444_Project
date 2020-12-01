<?php
	session_start();
	
	$_SESSION['user'] = NULL;
	if($_SESSION['user'] == NULL){
		header("location:login.php");
	}
	else{
		header("location:main.php");
	}
?>