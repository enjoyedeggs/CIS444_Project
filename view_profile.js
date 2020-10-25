function retrieveInformation() {
    //Get list of users to display on admin homepage
    displayInfo("profile_picture", getProfilePicture());
    displayInfo("first_name", getFirstName());
    displayInfo("last_name", getLastName());
    displayInfo("email_address", getEmailAddress());
    displayInfo("signature", getSignature());
    displayInfo("courses", getCourses());
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

function getCourses(){
    var course_list = ["CIS 444", "CS 421", "CS 446", "CS 351"];
    var count_courses = course_list.length;
    var courses = "";
    var i;

    for (i = 0; i < count_courses; i++){
        courses += course_list[i];
        if (i < count_courses-1){
            courses += "<br>";
        }
    }

    return courses;
}