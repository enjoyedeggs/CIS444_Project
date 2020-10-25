/*
function submission() {
	//TODO: log user out.
// Get the input field
var input = document.getElementById("subButton");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === enter) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("subButton").click();
  }
});

	window.location.href = "subforum.html";
}
*/
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