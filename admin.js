function retrieveInformation() {
	//Get list of "flagged" posts for admin to review.
	getFlagged();
	
	//Get list of users to display on admin homepage
	getUsers();
		
	return false;
}

function getFlagged(flagged) {
	//console.log(flagged);
	try {
		var len = flagged.length;
		//console.log(len);
	} catch (err) {};
	if (len == 0)
	{
		var resultsDisplay = document.createElement("div");
		resultsDisplay.setAttribute("class", "searchresults");
		var innerP = document.createElement("p");
		innerP.innerHTML = "No flagged posts to review.";
		resultsDisplay.appendChild(innerP);
		document.getElementById("flaggedPosts").appendChild(resultsDisplay);
	}
	else if (len >= 1) {
		
		for (var i = 0; i < flagged.length; i++) {
			
			var resultsDisplay = document.createElement("div");
			resultsDisplay.setAttribute("class", "searchresults");
			resultsDisplay.setAttribute("id", flagged[i][5]+"-"+flagged[i][4]+"-"+flagged[i][2]);
			resultsDisplay.setAttribute("onclick", "viewPost(this.id)");
			var inner = document.createElement("div");
			var user = document.createElement("p");
			user.innerHTML = '<span class="bolded"> Student: </span>' + flagged[i][0] + " " + flagged[i][1];
			inner.appendChild(user);
			var course = document.createElement("p");
			course.innerHTML = '<span class="bolded"> Course: </span>' + flagged[i][5];
			// var delButton = document.createElement("button");
			// delButton.setAttribute("class", "submitstyle");
			// delButton.setAttribute("id", flagged[i][2]+"db");
			// delButton.setAttribute("style", "margin-left:15px; margin-top:0px;");
			// delButton.setAttribute("onclick", 'deletePost("flagged", this.id);');
			// delButton.innerHTML = "Delete Post";
			// course.appendChild(delButton);
			// var lockPost = document.createElement("input");
			// lockPost.setAttribute("type", "checkbox");
			// lockPost.setAttribute("class", "submitstyle");
			// lockPost.setAttribute("id", flagged[i][2]+"b");
			// lockPost.setAttribute("style", "margin-left:15px; margin-top:0px;");
			// lockPost.setAttribute("onclick",'lockPost("flagged", this.id);');
			// var lockLbl = document.createElement("label");
			// lockLbl.setAttribute("for", flagged[i][2]);
			// lockLbl.innerHTML = "Lock Post";
			// course.appendChild(lockPost);
			// course.appendChild(lockLbl);
			inner.appendChild(course);
			var topic = document.createElement("p");
			topic.innerHTML = '<span class="bolded">Subforum: </span>' + flagged[i][4];
			inner.appendChild(topic);
			var description = document.createElement("p");
			description.innerHTML = '<span class="bolded">Description: </span>' + flagged[i][3];
			inner.appendChild(description);
			resultsDisplay.appendChild(inner);
			
		
			document.getElementById("flaggedPosts").appendChild(resultsDisplay);
		}
	}
}

function getUsers(users) {
	//console.log(users);
	try {
		var len = users.length;
		//console.log(len);
	} catch (err) {};
	if (len == 0) {
		var divElem = document.createElement("div");
		divElem.setAttribute("class", "searchresults");
		var para = document.createElement("p");
		para.innerHTML = "No users to display.";
		divElem.appendChild(para);
		document.getElementById("usersList").appendChild(divElem);
		//console.log("done");
	}
	else if (len >= 1) {
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
		acctH.setAttribute("class", "status bolded");
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
			courses.innerHTML = users[i][1];
			coursesList.appendChild(courses);
			var email = document.createElement("div");
			email.setAttribute("class", "item-email");
			email.innerHTML = users[i][2];
			var numPosts = document.createElement("div");
			numPosts.setAttribute("class", "item-postnum");
			numPosts.innerHTML = users[i][3];
			//var delForm = document.createElement("form");
			//delForm.setAttribute("id", users[i][2]+"fb");
			var deleteUser = document.createElement("form");
			//deleteUser.setAttribute("action", "admin.php"); 
			deleteUser.setAttribute("id", users[i][2]+"b");
			deleteUser.setAttribute("name", users[i][2]+"fb");
			deleteUser.setAttribute("method", "post");
			var btn = document.createElement("input");
			btn.setAttribute("type", "submit");
			btn.setAttribute("id", users[i][2]+"sb");
			btn.setAttribute("name", users[i][2]+"sb");
			btn.setAttribute("onclick", "removeUser(this.id)");
			if (users[i][4] == "disabled")
				btn.setAttribute("class", "item-disable delete");
			else 
				btn.setAttribute("class", "item-disable enable");
			btn.value = users[i][4];
			deleteUser.appendChild(btn);
			//delForm.appendChild(deleteUser);
			row.appendChild(name);
			row.appendChild(coursesList);
			row.appendChild(email);
			row.appendChild(numPosts);
			//deleteUser.appendChild(delButton);
			row.appendChild(deleteUser);
			document.getElementById("usersList").appendChild(row);
		}

		
		
	}
	
	
}
function searchForum(results) {
	//TODO: gather search results from php
	//console.log(results);
	//Change "Admin Page" heading to Search Results"
	var heading = document.getElementById("adminheading");
	heading.innerHTML= "Search Results";
	
	//Clear results before showing new ones
	removeAllChildNodes(document.getElementById("searchResults"));
	var searchtext = document.getElementById("searchInput");
	searchtext.value = '';
	//var results = new Array(); //replace with PHP function call to get results
	//results = [["Suchi Kapur", "100", "CIS444", "HW", "Database Connection with PHP"],["Bartholomew Falzarano", "105", "CIS444", "HW", "PHP with JavaScript"]];
	
	
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
			resultsDisplay.setAttribute("id", results[i][4]+"-"+results[i][3]+"-"+results[i][0]);
			resultsDisplay.setAttribute("onclick", "viewPost(this.id)");
			var user = document.createElement("p");
			user.innerHTML = '<span class="bolded"> Student: </span>' + results[i][5] + " " + results[i][6];
			resultsDisplay.appendChild(user);
			var course = document.createElement("p");
			course.innerHTML = '<span class="bolded"> Course: </span>' + results[i][4];
			resultsDisplay.appendChild(course);
			var topic = document.createElement("p");
			topic.innerHTML = '<span class="bolded">Subforum: </span>' + results[i][3];
			resultsDisplay.appendChild(topic);
			var description = document.createElement("p");
			description.innerHTML = '<span class="bolded">Title: </span>' + results[i][1];
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
		//console.log(document.getElementById("adminheading").children);
		if (document.getElementById("flaggedPosts").children.length === 1) {
			var resultsDisplay = document.createElement("div");
			resultsDisplay.setAttribute("class", "searchresults");
			var innerP = document.createElement("p");
			innerP.innerHTML = "No flagged posts to review.";
			resultsDisplay.appendChild(innerP);
			document.getElementById("flaggedPosts").appendChild(resultsDisplay);
		}
		//retrieveInformation(); 
	}
	
	
}

function lockPost(from, postID) {
	var subs = postID.substring(0, postID.length - 1);
	var dom = document.getElementById(subs);
	var check = document.getElementById(postID);
	if (check.checked) {
		//TODO: lock post
		check.disabled = true;
	}
	
}

function removeUser(userId) {
	//TODO: Disable/Enable User
	//console.log(userId);
	//Remove user from users list
	var subs = userId.substring(0, userId.length - 2);
	//console.log(subs);
	var dom = document.getElementById(subs);

	//Change between "DISABLE" and "ENABLE"
	var delButton = document.getElementById(userId);
	var orig = delButton.value;
	//console.log(delButton.innerHTML);
	if (delButton.value === "disabled") {
		//TODO: Enable user in database (like reactivating acct)
		delButton.value = "enabled";
		delButton.setAttribute("class", "item-disable enable");
	}
	else {
		//TODO: Disable user in database (deactivate acct)
		delButton.value = "disabled";
		delButton.setAttribute("class", "item-disable delete");
	}
	var email = subs.substring(0, subs.length - 18);
	//var new_loc = "admin.php" + "?user=" + email;
	//window.location = new_loc; 
	var url = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + "user=" +email + "&status=" + orig;
	window.history.pushState({path:url}, '', url);
	//console.log(new_loc);
}

function viewPost(id) {
	var info = id.split("-");
	var course = info[0];
	var subforum = info[1];
	id = info[2];
	//console.log(course + " " + subforum + " " + id);
	//TODO: redirect user to proper post for specified ID;
	//console.log(id);
	window.location.href = "admin_viewpost.php?course=" + course+ "&subforum=" + subforum + "&postid="+id;
}

function logout() {
	//TODO: log user out.
	window.location.href = "admin_login.php";
}
