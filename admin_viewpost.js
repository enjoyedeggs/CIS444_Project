/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var url =(window.location).toString();
var forumname;
var course;
var subforum;
var post;
var queryPos;
var title= "Database Connection with PHP"; //dummy data
var postStatus = "locked";
function getInfo() {
	forumName = (window.location).toString();
	var pos = forumName.search(/\?/);
	queryPos = pos;
	if (pos > 0){
		var coursePos = forumName.search(/course=/);
		var subforumPos = forumName.search(/subforum=/);
		var postPos = forumName.search(/postid=/);
		course = forumName.substring(coursePos+7, subforumPos);
		post = forumName.substring(postPos);
		subforum = forumName.substring(subforumPos+9, postPos);
		forumName = course + " " + subforum;
		var posth = document.getElementById("post-header");
		posth.setAttribute("id", post+"post-header");
		//console.log(postStatus);
		//console.log(postStatus === "flagged");
		var inner;
		if (postStatus === "NULL")
			inner = title; //Placeholder for PHP
		else if (postStatus === "flagged")
			inner = title + " -- FLAGGED"; //Placeholder for PHP
		else if (postStatus === "locked") 
			inner = title + " -- LOCKED";
			
		posth.innerHTML = inner;	
		
		//posth.innerHTML = "Database Connection with PHP"; //Placeholder for PHP
		var profilebox = document.getElementById("profile-pic");
		var profilepic = document.createElement("img");
		var disbtn = document.getElementById("disablebtn");
		disbtn.setAttribute("id", post+"admin");
		
		var lockbtn = document.getElementById("lockpost");
		lockbtn.setAttribute("id", "lock"+post);
		if (postStatus === "locked") {
			lockbtn.checked = true;
			lockbtn.disabled = true;
		}
		//TODO: get user's profile picture
		var profile_src = "images/profilepicture.png";//Placeholder
		profilepic.setAttribute("src", profile_src);
		profilepic.setAttribute("alt", "Author's profile picture");
		profilepic.setAttribute("class", "post-profile-picture");
		profilebox.appendChild(profilepic);
		var user = document.getElementById("username");
		user.innerHTML = getUserName(post);//PHP Placeholder: Get user name from database
		
		
		//TODO: get post content
		var postcont = document.getElementById("post-content");
		postcont.innerHTML = getPostContent(post); //Placeholder
		
		//TODO: Get replies
		getReplies(post);
		
		var doc = document.getElementsByTagName("html")[0];
		doc.style.visibility="visible";
	}
	else {
		alert("Cannot access this page without selecting a post from the admin home page via search. You will be redirected to the admin home page.");
		window.location.href = "admin.html";
	}
}
function getUserName(postid) {
	return "Suchi Kapur"; //Dummy Data
}

function getPostContent(postid) {
	return "How can I connect my database to my website?";
}

function getReplies(postid) {
	var replies = new Array(); //Placeholder for PHP function
	replies = [["RE: Database Connection with PHP", "Jason Luu", "100", "Watch the last lecture video recording.", "NULL"]];
	var replies_dom = document.getElementById("replies");
	if (replies.length == 0) {
		replies_dom.innerHTML = 'This post does not have any replies yet.';
		replies_dom.setAttribute("class", "reply-msg");
	}
	else {
		for (var i = 0; i < replies.length; i++) {
			var postDiv = document.createElement("div");
			postDiv.setAttribute("class", "vpcontainer");
			postDiv.setAttribute("id", replies[i][2]);
			var head = document.createElement("div");
			head.setAttribute("class", "headerbox");
			var postTitle = document.createElement("h2");
			postTitle.setAttribute("id", replies[i][2]+"post-header");
			postTitle.innerHTML = replies[i][0];
			postTitle.setAttribute("class", "postheader");
			head.appendChild(postTitle);
			postDiv.appendChild(head);
			
			var profile_sec = document.createElement("div");
			profile_sec.setAttribute("class", "profileandbody");
			var authorsec = document.createElement("div");
			authorsec.setAttribute("class", "profilebox");
			var user = document.createElement("div");
			user.setAttribute("class", "indent");
			user.setAttribute("id", replies[i][1]);
			user.innerHTML = replies[i][1];
			authorsec.appendChild(user);
			var bodycont = document.createElement("div");
			bodycont.setAttribute("class", "bodybox");
			bodycont.innerHTML = replies[i][3];
			
			profile_sec.appendChild(authorsec);
			profile_sec.appendChild(bodycont);
			

			
			var adminControls = document.createElement("div");
			adminControls.setAttribute("id", replies[i][2]+"admin-controls");
			adminControls.setAttribute("class", "admin-controls");
			var adminDel = document.createElement("button");
			adminDel.setAttribute("id", replies[i][2]+"admin");
			adminDel.setAttribute("onclick", "deletePost(this.id)");
			adminDel.innerHTML = "Delete Reply";
			adminControls.appendChild(adminDel);
			// var lockLbl = document.createElement("label");
			// lockLbl.setAttribute("for", "lock"+replies[i][2]);
			// lockLbl.innerHTML = "Lock Reply";
			// var lockInput = document.createElement("input");
			// lockInput.setAttribute("id", "lock"+replies[i][2]);
			// lockInput.setAttribute("type" , "checkbox");
			// lockInput.setAttribute("onchange", "lockPost(this.id)");
			// lockLbl.appendChild(lockInput);
			// adminControls.appendChild(lockLbl);
			
			
			
			
			postDiv.appendChild(profile_sec);
			postDiv.appendChild(adminControls);
			replies_dom.appendChild(postDiv);
		}
		
	}
}



function deletePost(id) {
	var newid = id.replace("admin", "");
	var postID = post;
	//console.log(postID);
	//console.log(id);
	//console.log(newid);

	if (postID === newid) {
		alert("This post has been deleted. You will be redirected back to the admin home page.");
		window.location.href = "admin.html";
		
		
	}
	else {
		var reply = document.getElementById(newid);
		var replies_dom = document.getElementById("replies");
		replies_dom.removeChild(reply);
		//console.log(replies_dom.hasChildNodes());
		//console.log(replies_dom.childNodes.length);
		if (replies_dom.children.length === 0) {
			
			replies_dom.innerHTML = 'This post does not have any replies yet.';
			replies_dom.setAttribute("class", "reply-msg");
		
		}
	}
	//TODO: delete post from database
	
	
}

function lockPost(id) {
	var newid = id.replace("lock", "");
	//console.log(newid);
	//console.log(id);
	var head = document.getElementById(newid+"post-header");
	
	var dom = document.getElementById(id);
	if (dom.checked) {
		head.innerHTML = title + " -- LOCKED";
		document.getElementById(id).disabled = true;
	}
	else {
		head.innerHTML = title;
	}
	//TODO: lock post
	
}

function logout() {
	
	window.location.href = "admin_index.html";
}