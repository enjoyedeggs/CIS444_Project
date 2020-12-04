function retrieveInformation(results, courses) {
	
	//console.log(results);
	//console.log(courses == null);
	displayProfilePicture(results[0][3]);
	displayUserInfo(results[0][0], results[0][1],results[0][2]);
	displayInfo("signature", results[0][4]);
	if (courses[0][0] != null){
		var crs = courses[0][0].split(', ');
		displayInfo("courses", getCourses(crs));
	}
	else {
		 displayInfo("courses", "");
	}
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
function displayProfilePicture(filename) {
	var filename = "users/" + filename; //placeholder
	if (filename !== "NULL") {
    var innerP = document.createElement("img");
    innerP.setAttribute("src", filename);
	innerP.setAttribute("alt", "Profile Picture");
	innerP.setAttribute("class", "profile-picture floatleft");
    document.getElementById("profile-picture-div").appendChild(innerP);}
}

function displayUserInfo(fname, lname, email) {

	var dom = document.getElementById("user-info");
	
	var fnameElem = document.createElement("div");
	fnameElem.innerHTML = "Name: " + fname + " " + lname;
	
	var emailElem = document.createElement("div");
	emailElem.innerHTML = "Email: " + email;
	
	dom.appendChild(fnameElem);
	dom.appendChild(emailElem);
	
	
}


function getCourses(course_list){
	//console.log(course_list);
    //var course_list = new Array();
	//ourse_list = ["CIS444", "CS433", "MKTG302"];
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
	//console.log(courses);
    return courses;
}