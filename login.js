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
	//console.log('in error');
	var dom = document.createElement("p");
	dom.setAttribute("class", "invalid");
	dom.setAttribute("id", "invalidMessage");
	dom.innerHTML = errorMsg;
	dom.style.visibility = "visible";
	var desc = document.getElementById("description");
	//dom.innerHTML = errorMsg;
	//console.log(errorMsg);
	//dom.setAttribute("class", "invalid");
	//dom.style.visibility = "visible";
	insertAfter(desc, dom);
	var email = document.getElementById("emailField");
	email.focus();
	return false;
	
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
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