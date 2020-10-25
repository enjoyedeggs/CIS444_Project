function checkForum() {
	forumName = (window.location).toString();
	var pos = forumName.search(/\?/);
	if (pos > 0){
		var coursePos = forumName.search(/course=/);
		var subforumPos = forumName.search(/subforum=/);
		course = forumName.substring(coursePos+7, subforumPos);
		subforum = forumName.substring(subforumPos+9);
		forumName = course + " " + subforum;
		var courseElem = document.getElementById("course-name");
		courseElem.innerHTML= course;
		
		var topicElem = document.getElementById("course-forum");
		topicElem.innerHTML= subforum;
		
		var doc = document.getElementsByTagName("html")[0];
		doc.style.visibility="visible";
		
		
	}
	else {
		//document.write("404: Page not found", "<br />", "Cannot access this page. You will be redirected to the main page.");
		alert("Cannot access this page without selecting a forum on the main page. You will be redirected to the main page.");
		window.location.href = "main.html";
	}	
}

function submission() {
	//TODO: Create new post/reply in database

	redirect();
	return false;
}

var forumName;
var course;
var subforum;

function redirect()
{
	forumName = (window.location).toString();
	var pos = forumName.search(/\?/);
	var coursePos = forumName.search(/course=/);
	var subforumPos = forumName.search(/subforum=/);
	course = forumName.substring(coursePos+7, subforumPos);
	subforum = forumName.substring(subforumPos+9);
	window.location.href = "subforum.html?course=" + course + "subforum=" + subforum;
}