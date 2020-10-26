function retrieveInformation() {
	displayProfilePicture();
	displayUserInfo();
	displayInfo("signature", getSignature());
    displayInfo("courses", getCourses());
	return false;
}

function displayInfo(piece, info) {
	var piece_Display = document.createElement("div");
    //piece_Display.setAttribute("class", "small-font");
    var innerP = document.createElement("p");
    innerP.innerHTML = info;
    piece_Display.appendChild(innerP);
    document.getElementById(piece).appendChild(piece_Display);
}
function displayProfilePicture() {
	var filename = getProfilePicture(); //placeholder
    var innerP = document.createElement("img");
    innerP.setAttribute("src", filename);
	innerP.setAttribute("alt", "Profile Picture");
	innerP.setAttribute("class", "profile-picture floatleft");
    document.getElementById("profile-picture-div").appendChild(innerP);
}

function displayUserInfo() {
	var fname = getFirstName();
	var lname = getLastName();
	var email = getEmailAddress();
	var dom = document.getElementById("user-info");
	
	var fnameElem = document.createElement("div");
	fnameElem.innerHTML = "Name: " + fname + " " + lname;
	
	var emailElem = document.createElement("div");
	emailElem.innerHTML = "Email: " + email;
	
	dom.appendChild(fnameElem);
	dom.appendChild(emailElem);
	
	
}
function getProfilePicture(){
    var profile_picture = "images/cr_logo.png";//placeholder for PHP function 
    return profile_picture;
}

function getFirstName(){
    var first_name = "Student's full name";
    return first_name;
}

function getLastName(){
    var last_name = "will populate";
    return last_name;
}

function getEmailAddress(){
    var email_address = "Student's email address will populate";//"couga001@cougars.csusm.edu";
    return email_address;
}

function getSignature(){
    var sig = "Student's signature will populate";
    return sig;
}

function getCourses(){
    var course_list = new Array();
	//course_list = ["CIS 444", "CS 421", "CS 446", "CS 351"];
    var count_courses = course_list.length;
    var courses = "";
    var i;

	if (course_list.length == 0 ){
		courses = "You are not enrolled in any courses. Edit profile to add courses.";
	}
    for (i = 0; i < count_courses; i++){
        courses += course_list[i];
        if (i < count_courses-1){
            courses += "<br>";
        }
    }

    return courses;
}