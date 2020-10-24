function retrieveInformation() {
    //Get list of users to display on admin homepage
    displayInfo("profile_picture", getProfilePicture());
    displayInfo("first_name", getFirstName());
    displayInfo("last_name", getLastName());
    displayInfo("email_address", getEmailAddress());
    displayInfo("signature", getSignature());
	return false;
}

function displayInfo(piece, info) {
	var piece_Display = document.createElement("div");
    piece_Display.setAttribute("class", "sub-description");
    var innerP = document.createElement("p");
    innerP.innerHTML = info;
    piece_Display.appendChild(innerP);
    document.getElementById(piece).appendChild(piece_Display);
}

function getProfilePicture(){
    var profile_picture = "Display the profile picture";
    return profile_picture;
}

function getFirstName(){
    var first_name = "Crash";
    return first_name;
}

function getLastName(){
    var last_name = "Cougar";
    return last_name;
}

function getEmailAddress(){
    var email_address = "couga001@cougars.csusm.edu";
    return email_address;
}

function getSignature(){
    var sig = "Gooo cougars!!!";
    return sig;
}