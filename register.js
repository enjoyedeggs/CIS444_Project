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
	var ciphertext =  CryptoJS.SHA256(pass);
	console.log(ciphertext.toString());
	document.getElementById("passField").value = ciphertext;
		
	return true;
	

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
	var pos = email.search(/^[A-Za-z]{1,5}\d{3}@cougars\.csusm\.edu$/);
	if (pos != 0) {
		alert("You must use a CSUSM issued student email to create an account!");
		return false;
	}
	return true;
}

function valid(validated)
{
	var pass = document.getElementById("passField");
	
	if (validated == true){
		
		//Clear fields
		fname = '';
		lname = '';
		email = '';
		pass = '';
		cpass = '';
		return true;
	}
	else {
		alert('This email address is already in use. Please log in or navigate to the "Forgot Password" page.');
		return false;
	}
}

function toMain() {
	window.location.href = "main.php";
}