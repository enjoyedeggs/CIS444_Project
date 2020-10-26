function makeVisible() {
	var dom = document.getElementById("change-pass");
	var divNode = document.getElementById("change-pass-div");
	if (dom.checked) {
		divNode.style.visibility = "visible";
	}
	else {
		divNode.style.visibility = "hidden";
	}
}

function retrieveInformation() {
	getPicture();
    document.getElementById("fname").value = "server-value";
    document.getElementById("lname").value = "server-value";
    document.getElementById("email").value = "server-value";
	document.getElementById("courses-list").value = "server-value";
    document.getElementById("signature").value = "server-value";
}

function getPicture() {
	var imgElem = document.createElement("img");
	var dom = document.getElementById("personal-info");
	//<img class="profile-picture floatleft" id="picture" alt="Your Profile Picture Here"/>
	imgElem.setAttribute("class", "profile-picture floatleft");
	imgElem.setAttribute("id", "picture");
	dom.appendChild(imgElem);
}
function csusmEmail(email) {
	var pos = email.search(/^[A-Za-z]{5}\d{3}@cougars\.csusm\.edu$/);
	if (pos != 0) {
		alert("You must use a CSUSM issued student email to create an account!");
		return false;
	}
	return true;
}

function getProfilePicture(){
    return document.getElementById("picture");
}

function getFirstName(){
    return document.getElementById("fname").value;
}

function getLastName(){
    return document.getElementById("lname").value;
}

function getEmailAddress(){
	 //if(csusmEmail(document.getElementById("email").value)){
	 	return document.getElementById("email").value;
	 //}
}

function getSignature(){
    return document.getElementById("signature").value;
}

function changePicture(){
	//alert(document.getElementById("pictureInput").value);
	document.getElementById("picture").src = URL.createObjectURL(document.getElementById("pictureInput").files[0]);
}

  
function saveChanges(){ 

	var dom = document.getElementById("change-pass");
	var opass = document.getElementById("oldpass");
	var npass = document.getElementById("newpass");
	var cpass = document.getElementById("confpass");
	if (dom.checked) {
		//TODO: verify encrypted old password against database
		var ciphertext = CryptoJS.AES.encrypt(opass.value, 'secretkey128');
		
		var oldMatch = true; //placeholder for PHP
		
		if (matchingPasswords(npass.value, cpass.value) == false) {
		
			return false;
		}
		else {
			alert("Password has been reset!");
		}
	}
	
	//alert("saving changes")
	getProfilePicture();
	getFirstName();
	getLastName();
	getEmailAddress();
	getSignature();
	window.location.href="view_profile.html";
	// use PUT requests to save data when database is made
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

