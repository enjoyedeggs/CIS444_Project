function invalidEmail(msg) {
	//TODO: add code to send an email to valid account
	//SEE: https://pepipost.com/tutorials/how-to-send-emails-with-javascript/
	
	//user is redirected to login page after
	var dom = document.getElementById("invalidMessage");
	document.getElementById("invalidMessage").innerHTML = msg;
	dom.style.visibility = "visible";
	//TODO: check that email is valid with PHP function
	// var email = document.getElementById("emailField").value;
	
	// if (validEmail == "true") {
		// //TODO: PHP to reset password to temporary password "cougarrescuereset"
		
		
		// //Send email to user's email address
		// Email.send({ 
        // Host: "smtp.gmail.com", 
        // Username: "cougarrescue.noreply@gmail.com", 
        // Password: "CougarRescue444", 
        // To: email, 
        // From: "cougarrescue.noreply@gmail.com", 
        // Subject: "Cougar Rescue Password Reset", 
        // Body: "If you did not request to reset your password, please ignore this email. " +
		// "Your temporary password for Cougar Rescue is: 'cougarrescuereset'. Please login and reset your password in your profile ASAP.", 
      // })
		// return true;
	// }
	// else {
		// alert("This email is not associated with any account. Please register to create an account!");
		// return false;
	// }
}

function goLogin() {
	window.location.href = "login.php";
}