var forumName;
var course;
var subforum;
function retrieveInformation() {
	//Get list of "flagged" posts for admin to review.
	
	forumName = (window.location).toString();
	var pos = forumName.search(/\?/);
	if (pos > 0){
		var coursePos = forumName.search(/course=/);
		var subforumPos = forumName.search(/&subforum=/);
		var sortPause = forumName.search(/&sortBy=/);
		var end = forumName.length;
		if (sortPause > 0) {
			end = sortPause;
		}
		course = forumName.substring(coursePos+7, subforumPos);
		subforum = forumName.substring(subforumPos+10, end);
		forumName = course + " " + subforum;
		var doc = document.getElementsByTagName("html")[0];
		doc.style.visibility="visible";
		//getPosts(forumName);
		
	}
	else {
		//document.write("404: Page not found", "<br />", "Cannot access this page. You will be redirected to the main page.");
		alert("Cannot access this page without selecting a forum on the main page. You will be redirected to the main page.");
		window.location.href = "main.php";
	}
	

		
	return false;
}



function getPosts(posts) {
	retrieveInformation()

  // var posts = new Array(); //placeholder for PHP function
	// posts = [["Mhealyssah Bustria", "Homework 6", "104", "1", "11-12-2020"],
	// 	["Bartholomew Falzarano", "PHP with JavaScript", "105", "1", "11-12-2020"]];
	//var posts = forumname;
	try {
		var len = posts.length;
		//console.log(len);
	} catch (err) {};
	//Case of not having any class
	var forum = document.getElementById("forum-name");
	forum.innerHTML = forumName;
	if (posts.length == 0) {
        var divElem0 = document.createElement("div");
        divElem0.setAttribute("class", "table-sub-format");
	    divElem0.innerHTML = "No posts to show, click \"New Post\" to be the first!";
        

      document.getElementById("subforum-div").appendChild(divElem0);
		
	}
	else {
		for (var i = 0; i < posts.length; i++) {

			
    	var divElem0 = document.createElement("div");
		  divElem0.setAttribute("class", "table-sub-format");
			divElem0.setAttribute("id", posts[i][2]);
			divElem0.setAttribute("onclick", "viewPost(this.id);");
			
			var divElem = document.createElement("div");
			divElem.setAttribute("class", "item-subforum");
			var divElem2 = document.createElement("div");
			divElem2.setAttribute("class", "item-subforum-author");
			var divElemA = document.createElement("div");//document.createElement("a");
			divElemA.setAttribute("class", "item-post-title");
			//divElemA.setAttribute("href", "main.html");
			divElemA.innerHTML = posts[i][1];
			var divElem3 = document.createElement("div");
			divElem3.setAttribute("class", "subforum-author");
			divElem3.innerHTML = posts[i][0];
			var divElem4 = document.createElement("div");
			divElem4.setAttribute("class", "item-replies");
			divElem4.innerHTML = posts[i][3];
			var divElem6 = document.createElement("div");
			divElem6.setAttribute("class", "item-last-post");
			divElem6.innerHTML = posts[i][4]

			divElem0.appendChild(divElem)
			divElem.appendChild(divElem2);
			divElem2.appendChild(divElemA);
			divElem2.appendChild(divElem3);
			divElem0.appendChild(divElem4);
			divElem0.appendChild(divElem6);

			document.getElementById("subforum-div").appendChild(divElem0);
	  }
	
	    }
}



function logout() {
	//TODO: log user out.
	window.location.href = "index.php";
}

function viewPost(id) {
	//TODO: view post 
	window.location.href = "viewpost.php?course=" + course + "&subforum=" + subforum+ "&postid=" +id;
}

function newPost(id) {
	window.location.href = "new_post.php?course=" + course + "&subforum=" +subforum;
}

function sortPosts() {
	var dom = document.getElementById("sortby");
	console.log("admin.php?sortBy=" + dom.value);
	console.log(subforum);
	var url = window.location.protocol + "//" + window.location.host + window.location.pathname + "?course=" + course + "&subforum=" + subforum + "&sortBy=" +dom.value;
	window.history.pushState({path:url}, '', url);
	//window.location.href = "admin.php?sortBy=" + dom.value;
}

