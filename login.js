function login(event) {
	//First validate user credentials, then redirect user to 
	//main page if correct. If invalid, prompt user with error
	//message.
	var email = document.getElementById("emailField").value;
	var pass = document.getElementById("passField").value;
	var isValid = checkCredentials(email, pass);
	if (isValid == true)
		redirect(event);
	else {
		var dom = document.getElementById("invalidMessage");
		dom.style.visibility = "visible";
		document.getElementById("emailField").value = '';
		document.getElementById("passField").value = '';
		document.getElementById("emailField").focus();
	}
}

function checkCredentials(email, pass) {
	//TODO: validate credentials with database
	
	return true;
}


function redirect(event) {
	//Redirects the user to the main page upon successful login.
	window.location.href = "main.html";

}