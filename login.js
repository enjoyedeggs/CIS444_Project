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
	
	var isValid = true; 
	if (isValid == true) {
		//Redirects the user to the main page upon successful login.
		email.value = '';
		pass.value = '';
		return true;
	}
	else {
		var dom = document.getElementById("invalidMessage");
		dom.style.visibility = "visible";
		email.value = '';
		pass.value = '';
		email.focus();
		return false;
	}
}

function goAdmin() {
	window.location.href = "admin_index.html";
}
