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
    document.getElementById("fname").value = "Suchi";
    document.getElementById("lname").value = "Kapur";
    document.getElementById("email").value = "kapur005@cougars.csusm.edu";
	document.getElementById("courses-list").value = "CIS444\nCS433\nMKTG302";
    document.getElementById("signature").value = "I love being a CIS major!";
}

function getPicture() {
	var imgElem = document.createElement("img");
	var dom = document.getElementById("personal-info");
	//<img class="profile-picture floatleft" id="picture" alt="Your Profile Picture Here"/>
	imgElem.setAttribute("class", "profile-picture floatleft");
	imgElem.setAttribute("id", "picture");
	imgElem.setAttribute("src", "images/linkedin.jpg");//placeholder for PHP
	dom.appendChild(imgElem);
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

function getCourses(){
    var crs = document.getElementById("courses-list").value;
	crs = crs.replace('/ */', '');
	crs = crs.toUpperCase();
	//alert(crs);
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
		if (oldMatch == false) {
			alert('The password you have entered in the \"Old Password\" field is incorrect');
		}
		if (matchingPasswords(npass.value, cpass.value) == false) {
			alert("Passwords do not match.");
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
	getCourses();
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

