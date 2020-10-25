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