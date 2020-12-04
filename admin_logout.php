<?php
	session_set_cookie_params(30 * 60, "/; samesite=Strict", $_SERVER['HTTP_HOST'], 1, 0);
	session_start();
	
	$_SESSION['admin'] = NULL;
	if($_SESSION['admin'] == NULL){
		header("location:admin_login.php");
	}
	else{
		header("location:admin.php");
	}


?>