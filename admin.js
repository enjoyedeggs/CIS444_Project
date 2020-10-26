function retrieveInformation() {
	//Get list of "flagged" posts for admin to review.
	getFlagged();
	
	//Get list of users to display on admin homepage
	getUsers();
		
	return false;
}

function getFlagged() {
	var flagged = new Array(); //placeholder for flagged results
	//flagged = [["Bob the Builder", "456322", "CIS444", "Exam", "The answer to the question was C"]];

	if (flagged.length == 0)
	{
		var resultsDisplay = document.createElement("div");
		resultsDisplay.setAttribute("class", "searchresults");
		var innerP = document.createElement("p");
		innerP.innerHTML = "No flagged posts to review.";
		resultsDisplay.appendChild(innerP);
		document.getElementById("flaggedPosts").appendChild(resultsDisplay);
	}
	else {
		
		for (var i = 0; i < flagged.length; i++) {
			
			var resultsDisplay = document.createElement("div");
			resultsDisplay.setAttribute("class", "searchresults");
			resultsDisplay.setAttribute("id", flagged[i][1]);
			var inner = document.createElement("div");
			var user = document.createElement("p");
			user.innerHTML = '<span class="bolded"> Student: </span>' + flagged[i][0] ;
			inner.appendChild(user);
			var course = document.createElement("p");
			course.innerHTML = '<span class="bolded"> Course: </span>' + flagged[i][2];
			var delButton = document.createElement("button");
			delButton.setAttribute("class", "submitstyle");
			delButton.setAttribute("id", flagged[i][1]+"db");
			delButton.setAttribute("style", "margin-left:15px; margin-top:0px;");
			delButton.setAttribute("onclick", 'deletePost("flagged", this.id);');
			delButton.innerHTML = "Delete Post";
			course.appendChild(delButton);
			var lockPost = document.createElement("input");
			lockPost.setAttribute("type", "checkbox");
			lockPost.setAttribute("class", "submitstyle");
			lockPost.setAttribute("id", flagged[i][1]+"b");
			lockPost.setAttribute("style", "margin-left:15px; margin-top:0px;");
			lockPost.setAttribute("onclick",'lockPost("flagged", this.id);');
			var lockLbl = document.createElement("label");
			lockLbl.setAttribute("for", flagged[i][1]);
			lockLbl.innerHTML = "Lock Post";
			course.appendChild(lockPost);
			course.appendChild(lockLbl);
			inner.appendChild(course);
			var topic = document.createElement("p");
			topic.innerHTML = '<span class="bolded">Subforum: </span>' + flagged[i][3];
			inner.appendChild(topic);
			var description = document.createElement("p");
			description.innerHTML = '<span class="bolded">Description: </span>' + flagged[i][4];
			inner.appendChild(description);
			resultsDisplay.appendChild(inner);
			
		
			document.getElementById("flaggedPosts").appendChild(resultsDisplay);
		}
	}
}

function getUsers() {
	var users = new Array(); //placeholder for PHP function
	users = [["Bob the Builder", ["CIS444", "CS351", "CS441"], "4th Year", "build001@cougars.csusm.edu", "12"], 
	["Jane Doe", ["CIS444", "CS351", "CS443"],  "4th Year","doe001@cougars.csusm.edu", "4"],
	["John Appleseed", ["CS443", "CS351", "CS441"], "3rd Year","apple001@cougars.csusm.edu", "1"]];
	
	if (users.length == 0) {
		var divElem = document.createElement("div");
		divElem.setAttribute("class", "searchresults");
		var para = document.createElement("p");
		para.innerHTML = "No users to display.";
		divElem.appendChild(para);
		document.getElementById("usersList").appendChild(divElem);
		//console.log("done");
	}
	else {
		var rowH = document.createElement("div");
		rowH.setAttribute("id", "heading");
		var outerDiv = document.createElement("div");
		outerDiv.setAttribute("class", "admin-table-format");
		outerDiv.setAttribute("id", "users-table");
		
		//Create Student Col
		var studentH = document.createElement("div");
        studentH.setAttribute("class","item-student bolded");
        studentH.innerHTML = "Student Name";
        outerDiv.appendChild(studentH);
		
        //Create Courses column
        var courseH = document.createElement("div");
        courseH.setAttribute("class","item-courses bolded");
        courseH.innerHTML = "Courses";
        outerDiv.appendChild(courseH);
		
        //Create CSUSM email Column
		var emailH = document.createElement("div");
		emailH.setAttribute("class", "item-email bolded");
		emailH.innerHTML = "CSUSM Email";
		outerDiv.appendChild(emailH);
		
		//Create Posts column
		var postH = document.createElement("div");
		postH.setAttribute("class", "item-postnum bolded");
		postH.innerHTML = "# of Posts";
		outerDiv.appendChild(postH);
		
		//Create Disable Col
		var acctH = document.createElement("div");
		acctH.setAttribute("class", "item-disable bolded");
		acctH.innerHTML = "Account Status";
		outerDiv.appendChild(acctH);
		rowH.appendChild(outerDiv);
		document.getElementById("usersList").appendChild(rowH);
		for (var i = 0; i < users.length; i++) {
			var row = document.createElement("div");
			row.setAttribute("id", users[i][3]);
			row.setAttribute("class", "admin-row-format");
			var name = document.createElement("div");
			name.setAttribute("class", "item-student");
			name.innerHTML = users[i][0];
			var coursesList = document.createElement("div");
			coursesList.setAttribute("class", "item-courses");
			var courses = document.createElement("div");
			courses.innerHTML = users[i][1].join(', ');
			coursesList.appendChild(courses);
			var email = document.createElement("div");
			email.setAttribute("class", "item-email");
			email.innerHTML = users[i][3];
			var numPosts = document.createElement("div");
			numPosts.setAttribute("class", "item-postnum");
			numPosts.innerHTML = users[i][4];
			var deleteUser = document.createElement("div");
			deleteUser.setAttribute("class", "item-disable delete");
			deleteUser.setAttribute("id", users[i][3]+"b");
			deleteUser.setAttribute("onclick", "removeUser(this.id)");
			deleteUser.innerHTML = "DISABLE";
			row.appendChild(name);
			row.appendChild(coursesList);
			row.appendChild(email);
			row.appendChild(numPosts);
			//deleteUser.appendChild(delButton);
			row.appendChild(deleteUser);
			document.getElementById("usersList").append(row);
		}

		
		
	}
	
	
}
function searchForum(event) {
	//TODO: gather search results from php
	
	//Change "Admin Page" heading to Search Results"
	var heading = document.getElementById("adminheading");
	heading.innerHTML= "Search Results";
	
	//Clear results before showing new ones
	removeAllChildNodes(document.getElementById("searchResults"));
	var searchtext = document.getElementById("searchInput");
	searchtext.value = '';
	var results = new Array(); //replace with PHP function call to get results
	results = [["Bob the Builder", "012345", "CIS444", "HW", "This is an example of the search functionality."], 
	["Jane Doe", "09876", "CIS444", "Test", "The midterm was easy!"]];
	
	
	if (results.length == 0)
	{
		var resultsDisplay = document.createElement("div");
		resultsDisplay.setAttribute("class", "searchresults");
		var innerP = document.createElement("p");
		innerP.innerHTML = "No matching search results.";
		resultsDisplay.appendChild(innerP);
		document.getElementById("searchResults").appendChild(resultsDisplay);
	}
	else {
		
			
		for (var i = 0; i < results.length; i++) {
			
			var resultsDisplay = document.createElement("div");
			resultsDisplay.setAttribute("class", "searchresults");
			resultsDisplay.setAttribute("id", results[i][2]+"-"+results[i][3]+"-"+results[i][1]);
			resultsDisplay.setAttribute("onclick", "viewPost(this.id)");
			var user = document.createElement("p");
			user.innerHTML = '<span class="bolded"> Student: </span>' + results[i][0] ;
			resultsDisplay.appendChild(user);
			var course = document.createElement("p");
			course.innerHTML = '<span class="bolded"> Course: </span>' + results[i][2];
			var delButton = document.createElement("button");
			delButton.setAttribute("class", "submitstyle");
			delButton.setAttribute("id", results[i][1]+"db");
			delButton.setAttribute("style", "margin-left:15px; margin-top:0px;");
			delButton.setAttribute("onclick", 'deletePost("search", this.id);');
			delButton.innerHTML = "Delete Post";
			course.appendChild(delButton);
			var lockPost = document.createElement("input");
			lockPost.setAttribute("type", "checkbox");
			lockPost.setAttribute("class", "submitstyle");
			lockPost.setAttribute("id", results[i][1]+"b");
			lockPost.setAttribute("style", "margin-left:15px; margin-top:0px;");
			lockPost.setAttribute("onclick",'lockPost("search", this.id);');
			var lockLbl = document.createElement("label");
			lockLbl.setAttribute("for", results[i][1]);
			lockLbl.innerHTML = "Lock Post";
			course.appendChild(lockPost);
			course.appendChild(lockLbl);
			resultsDisplay.appendChild(course);
			var topic = document.createElement("p");
			topic.innerHTML = '<span class="bolded">Subforum: </span>' + results[i][3];
			resultsDisplay.appendChild(topic);
			var description = document.createElement("p");
			description.innerHTML = '<span class="bolded">Description: </span>' + results[i][4];
			resultsDisplay.appendChild(description);
			
		
			document.getElementById("searchResults").appendChild(resultsDisplay);
		}
	}
	
	return false;
}

function removeAllChildNodes(parent) {
	
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
	
}

function deletePost(from, postID) {
	var subs = postID.substring(0, postID.length - 2);
	var dom = document.getElementById(subs);
	
	
	//TODO: delete post from database
	
	//Remove from search results
	if (from === "search") {
		document.getElementById("searchResults").removeChild(dom);
	}
	else if (from === "flagged") {
		document.getElementById("flaggedPosts").removeChild(dom);
		//retrieveInformation(); 
	}
	
	
}

function lockPost(from, postID) {
	var subs = postID.substring(0, postID.length - 1);
	var dom = document.getElementById(subs);
	var check = document.getElementById(postID);
	if (check.checked) {
		//TODO: lock post
	}
	else {
		//TODO: unlock post
	}
	
}

function removeUser(userId) {
	//TODO: Disable/Enable User
	
	//Remove user from users list
	var subs = userId.substring(0, userId.length - 1);
	var dom = document.getElementById(subs);

	//Change between "DISABLE" and "ENABLE"
	var delButton = document.getElementById(userId);
	if (delButton.innerHTML === "DISABLE") {
		//TODO: Enable user in database (like reactivating acct)
		delButton.innerHTML = "ENABLE";
		delButton.setAttribute("class", "item-disable enable");
	}
	else {
		//TODO: Disable user in database (deactivate acct)
		delButton.innerHTML = "DISABLE";
		delButton.setAttribute("class", "item-disable delete");
	}
	
	
}

function viewPost(id) {
	var info = id.split("-");
	var course = info[0];
	var subforum = info[1];
	id = info[2];
	//console.log(course + " " + subforum + " " + id);
	//TODO: redirect user to proper post for specified ID;
	//console.log(id);
	window.location.href = "viewpost.html?course=" + course+ "subforum=" + subforum + "postid="+id+"admin=true";
}

function logout() {
	//TODO: log user out.
	window.location.href = "admin_index.html";
}
