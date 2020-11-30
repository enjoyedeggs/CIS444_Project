function login(event) {
	//First validate user credentials, then redirect user to 
	//main page if correct. If invalid, prompt user with error
	//message.
	var email = document.getElementById("emailField");
	var pass = document.getElementById("passField");
	// Encrypt Password
	var encrypted = CryptoJS.SHA256(pass.value);
	//console.log(encrypted.toString());
	//TODO: validate credentials with database
	//placeholder for PHP function
	var acctStatus = 'enabled';
	var isValid = true; 
	if (isValid == true && acctStatus === 'enabled') {
		//Redirects the user to the main page upon successful login.
		email.value = '';
		pass.value = '';
		return true;
	}
	else if (acctStatus === 'disabled') {
		alert("Your account is disabled. Please contact cougarrescue.noreply@gmail.com to resolve.");
	}
	else {
		var dom = document.getElementById("invalidMessage");
		dom.style.visibility = "visible";
		
		pass.value = '';
		email.focus();
		return false;
	}
}

function goAdmin() {
	window.location.href = "admin_index.html";
}
