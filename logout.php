<?php
	session_set_cookie_params(30 * 60, "/; samesite=Strict", $_SERVER['HTTP_HOST'], 1, 0);
	session_start();
	
	$_SESSION['user'] = NULL;
	if($_SESSION['user'] == NULL){
		header("location:login.php");
	}
	else{
		header("location:main.php");
	}
?>