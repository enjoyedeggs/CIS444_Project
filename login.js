function login(event) {
	//First validate user credentials, then redirect user to 
	//main page if correct. If invalid, prompt user with error
	//message.
	var email = document.getElementById("emailField");
	var pass = document.getElementById("passField");
	// Encrypt Password
	var encrypted = CryptoJS.SHA256(pass.value);
	//console.log(encrypted.toString());
	document.getElementById("passField").value = encrypted;

}
function errorCredentials(errorMsg)
{
	var dom = document.getElementById("invalidMessage");
	dom.value = errorMsg;
	dom.setAttribute("class", "invalid");
	dom.style.visibility = "visible";
	var email = document.getElementById("emailField");
	email.focus();
	return false;
	
}
function goAdmin() {
	window.location.href = "admin_login.php";
}

function toMain()
{
	//console.log("going to main");
	window.location.href = "main.php"; 
}

function toAdmin() 
{
	
	window.location.href = "admin.php";
}