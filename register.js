function validateFields(event) {
	//TODO: Validate CSUSM email, add backend for storing in database
	//upon successful input field completion
	var fname = document.getElementById("fnameField").value;
	var lname = document.getElementById("lnameField").value;
	var email = document.getElementById("emailField").value;
	var pass = document.getElementById("passField").value;
	var cpass = document.getElementById("cpassField").value;
 
	//Confirm CSUSM email	
	//Confirm passwords match
	if (matchingPasswords(pass, cpass) == false || csusmEmail(email) == false) {
		
		return false;
	}
	
	//TODO: Check with PHP function if email is already in use or not.
	var validated = true;
	if (validated == true){
		//TODO: Send to PHP function to create account with encrypted password
		//Encrypt Password
		var ciphertext = CryptoJS.AES.encrypt(pass.value, 'secretkey128');
		
		
		//Clear fields
		fname = '';
		lname = '';
		email = '';
		pass = '';
		cpass = '';
		return true;
	}
	else {
		
		return false;
	}
}

function matchingPasswords(pass1, pass2) {
	
	if (pass1 === pass2) {
		if (pass1.length < 8) {
			alert("Password must be at least 8 characters long.");
			return false;
		}
		else
			return true;
	}
	else {
		alert("Passwords must match!");
		return false;
	}
	
}

function csusmEmail(email) {
	var pos = email.search(/^[A-Za-z]{5}\d{3}@cougars\.csusm\.edu$/);
	if (pos != 0) {
		alert("You must use a CSUSM issued student email to create an account!");
		return false;
	}
	return true;
}
