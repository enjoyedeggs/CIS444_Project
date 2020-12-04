var orig_pass;
var conf_pass;
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

function retrieveInformation(userInfo) {
	getPicture('users/' + userInfo[0][3]);
    document.getElementById("fname").value = userInfo[0][0];
    document.getElementById("lname").value = userInfo[0][1];
    document.getElementById("email").value = userInfo[0][2];
	document.getElementById("courses-list").value = userInfo[0][5].replace(/, /g, '\n');
    document.getElementById("signature").value = userInfo[0][4];
}

function getPicture(pictureLink) {
	var imgElem = document.createElement("img");
	
	var dom = document.getElementById("personal-info");
	//<img class="profile-picture floatleft" id="picture" alt="Your Profile Picture Here"/>
	imgElem.setAttribute("class", "profile-picture floatleft");
	imgElem.setAttribute("id", "picture");
	imgElem.setAttribute("name", "profilepicture");
	//alert(pictureLink);
	imgElem.setAttribute("src", pictureLink);
	//imgElem.setAttribute("value", pictureLink);
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
	//console.log("here");
	
	crs = crs.replace(/\n/g, ", ");
	crs = crs.toUpperCase();
	document.getElementById("courses-list").value = crs;
	//console.log(crs);
	//return document.getElementById("courses-list").value;
	//alert(crs);
}

function changePicture(){
	//alert(document.getElementById("pictureInput").value);
	document.getElementById("picture").src = URL.createObjectURL(document.getElementById("pictureInput").files[0]);
}

function saveUpdates(event) {
	getCourses();
	
}
  
function saveChanges(){ 

	var dom = document.getElementById("change-pass");
	var opass = document.getElementById("oldpass");
	
	
	var cpass = document.getElementById("confpass");
	
	origpass=opass.value;
	var ciphertext = CryptoJS.SHA256(opass.value);
	document.getElementById("oldpass").value = ciphertext;
			//console.log(ciphertext.toString());
	var npass = document.getElementById("newpass");
	var cipher = CryptoJS.SHA256(npass.value);
	document.getElementById("newpass").value = cipher;
	
	cipher = CryptoJS.SHA256(cpass.value);
	document.getElementById("confpass").value = cipher;

	return true;
}
function invalidPass(oldMatch, msg) {
		//TODO: verify encrypted old password against database
	
		if (oldMatch == false) {
			errorMessage(msg);
			var dom = document.getElementById("change-pass");
			dom.checked=true;
			makeVisible();
			var opass = document.getElementById("oldpass").value=orig_pass;
			//console.log("invalid");
			return;
		}
}
function encryptPass() {
	var npass = document.getElementById("newpass");
	var ciphertext = CryptoJS.SHA256(npass.value);
	document.getElementById("newpass").value = ciphertext;
}

function matchingPasswords(pass1, pass2) {
	
	
	if (pass1 === pass2) {
		if (pass1.length < 8) {
			errorMessage("Password must be at least 8 characters long.");
			return false;
		}
		else
			return true;
	}
	else {
		errorMessage("Passwords must match!");
		return false;
	}
	
}

function errorMessage(message) {
	var msg = document.getElementById("error");
	msg.innerHTML = message;
	msg.style.visibility = "visible";
}

function toProfile() {
	window.location.href = "view_profile.php";
}