function retrieveInformation() {
    //Get list of users to display on admin homepage
    alert("hi");
	getInfo();
	return false;
}

function getInfo() {
	var profile_picure_Display = document.createElement("div");
    profile_picture_Display.setAttribute("class", "sub-description");
    var innerP = document.createElement("p");
    innerP.innerHTML = "Display the profile picture.";
    profile_picture_Display.appendChild(innerP);
    document.getElementById("profile_picture").appendChild(profile_picture_Display);
}