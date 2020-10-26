var forumName;
var course;
var subforum;
function retrieveInformation() {
	//Get list of "flagged" posts for admin to review.
	
	forumName = (window.location).toString();
	var pos = forumName.search(/\?/);
	if (pos > 0){
		var coursePos = forumName.search(/course=/);
		var subforumPos = forumName.search(/subforum=/);
		course = forumName.substring(coursePos+7, subforumPos);
		subforum = forumName.substring(subforumPos+9);
		forumName = course + " " + subforum;
		var doc = document.getElementsByTagName("html")[0];
		doc.style.visibility="visible";
		getPosts(forumName);
		
	}
	else {
		//document.write("404: Page not found", "<br />", "Cannot access this page. You will be redirected to the main page.");
		alert("Cannot access this page without selecting a forum on the main page. You will be redirected to the main page.");
		window.location.href = "main.html";
	}
	

		
	return false;
}



function getPosts(forumname) {

    var posts = new Array(); //placeholder for PHP function
	posts = [["User1", "Post Title", "postid1", "4", "6", "12/25/10"],["User2", "Post Title", "postid2",  "4","5", "10/1/20"],
    ["User3", "Post Title","postid3",  "3","4", "1/4/98"]];
	var forum = document.getElementById("forum-name");
	forum.innerHTML = forumname;
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
			var date = new Date(posts[i][5]);
            divElem6.innerHTML = (date.getMonth()+1).toString() + "/" + date.getDay() + "/" + date.getFullYear();

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
	window.location.href = "admin_index.html";
}

function viewPost(id) {
	//TODO: view post 
	window.location.href = "viewpost.html?course=" + course + "subforum=" + subforum+ "postid=" +id+"admin=false";
}

function newPost(id) {
	window.location.href = "new_post.html?course=" + course + "subforum=" +subforum;
}