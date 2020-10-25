function retrieveInformation() {
    document.getElementById("fname").value = "server-value";
    document.getElementById("lname").value = "server-value";
    document.getElementById("email").value = "server-value";
    document.getElementById("signature").value = "server-value";
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
	 if(csusmEmail(document.getElementById("email").value)){
	 	return document.getElementById("email").value;
	 }
}

function getSignature(){
    return document.getElementById("signature").value;
}

function changePicture(){
	alert(document.getElementById("pictureInput").value);
	document.getElementById("picture").src = URL.createObjectURL(document.getElementById("pictureInput").files[0]);
}

  
function saveChanges(){                   
	alert("saving changes")
	getProfilePicture();
	getFirstName();
	getLastName();
	getEmailAddress();
	getSignature();
	// use PUT requests to save data when database is made
}

