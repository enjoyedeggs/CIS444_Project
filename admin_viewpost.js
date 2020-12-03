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
var title; //dummy data
var postStatus;
function getInfo(postinfo) {
	//console.log(postinfo);
	try {
		var len = postinfo.length;
	}catch(err) {}
	//console.log(postinfo);
	forumName = (window.location).toString();
	var pos = forumName.search(/\?/);
	queryPos = pos;
	if (pos > 0){
		var coursePos = forumName.search(/course=/);
		var subforumPos = forumName.search(/&subforum=/);
		var postPos = forumName.search(/&postid=/);
		course = forumName.substring(coursePos+7, subforumPos);
		post = forumName.substring(postPos+8);
		subforum = forumName.substring(subforumPos+10, postPos);
		//console.log(course, post, subforum);
		forumName = course + " " + subforum;
		var posth = document.getElementById("post-header");
		//console.log(posth);
		posth.setAttribute("id", post+"post-header");
		//console.log(postStatus);
		//console.log(postStatus === "flagged");
		var inner = postinfo[0][3];
		//console.log(title);
		postStatus = postinfo[0][5]; //Placeholder for PHP
		if (postStatus === "flagged")
			inner = inner + " -- FLAGGED"; //Placeholder for PHP
		else if (postStatus === "locked") 
			inner = inner + " -- LOCKED";
			
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
		var profile_src = "users/" + postinfo[0][2];//Placeholder
		profilepic.setAttribute("src", profile_src);
		profilepic.setAttribute("alt", "Author's profile picture");
		profilepic.setAttribute("class", "post-profile-picture");
		profilebox.appendChild(profilepic);
		var user = document.getElementById("username");
		user.innerHTML = postinfo[0][0] + " " + postinfo[0][1];//PHP Placeholder: Get user name from database
		
		
		//TODO: get post content
		var postcont = document.getElementById("post-content");
		postcont.innerHTML = postinfo[0][4]; //Placeholder
		
		//TODO: Get replies
		getReplies(replies);
		
		var doc = document.getElementsByTagName("html")[0];
		doc.style.visibility="visible";
	}
	else {
		alert("Cannot access this page without selecting a post from the admin home page via search. You will be redirected to the admin home page.");
		window.location.href = "admin.php";
	}
}


function getReplies(replies) {
	//var replies = new Array(); //Placeholder for PHP function
	//replies = [["RE: Database Connection with PHP", "Jason Luu", "100", "Watch the last lecture video recording.", "NULL"]];
	try {
		var len = replies.length;
	}catch(err) {}
	var replies_dom = document.getElementById("replies");
	if (len == 0) {
		replies_dom.innerHTML = 'This post does not have any replies yet.';
		replies_dom.setAttribute("class", "reply-msg");
	}
	else {
		for (var i = 0; i < replies.length; i++) {
			var postDiv = document.createElement("div");
			postDiv.setAttribute("class", "vpcontainer");
			postDiv.setAttribute("id", replies[i][6]);
			var head = document.createElement("div");
			head.setAttribute("class", "headerbox");
			var postTitle = document.createElement("h2");
			postTitle.setAttribute("id", replies[i][6]+"post-header");
			postTitle.innerHTML = replies[i][3];
			postTitle.setAttribute("class", "postheader");
			head.appendChild(postTitle);
			postDiv.appendChild(head);
			
			var profile_sec = document.createElement("div");
			profile_sec.setAttribute("class", "profileandbody");
			var authorsec = document.createElement("div");
			authorsec.setAttribute("class", "profilebox");
			var user = document.createElement("div");
			user.setAttribute("class", "indent");
			user.setAttribute("id", replies[i][6]);
			user.innerHTML = replies[i][0] + " " + replies[i][1];
			authorsec.appendChild(user);
			var bodycont = document.createElement("div");
			bodycont.setAttribute("class", "bodybox");
			bodycont.innerHTML = replies[i][4];
			
			profile_sec.appendChild(authorsec);
			profile_sec.appendChild(bodycont);
			

			
			var adminControls = document.createElement("div");
			adminControls.setAttribute("id", replies[i][6]+"admin-controls");
			adminControls.setAttribute("class", "admin-controls");
			var adminDel = document.createElement("button");
			adminDel.setAttribute("id", replies[i][6]+"adminr");
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
	var isreply = false;
	//console.log(id.length);
	var pos = id.search(/r/);
	console.log(pos);
	if (pos == id.length-1) {
		isreply = true;
		//console.log("here");
		newid = newid.replace('r', "");
	}
	//console.log(postID);
	//console.log(id);
	//console.log(newid);

	if (isreply == false) {
		var url = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + "post=" +post;
		window.history.pushState({path:url}, '', url);
		//alert("This post has been deleted. You will be redirected back to the admin home page.");
		//window.history.pushState({path:"admin.php"}, '', "admin.php"); ;
		
		
	}
	else if (isreply == true) {
		var reply = document.getElementById(newid);
		var replies_dom = document.getElementById("replies");
		replies_dom.removeChild(reply);
		window.location.href = window.location.pathname + "?course=" + course + "&subforum=" + subforum + "&postid=" + post + "&reply=" +newid;

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
	//document.getElementById("admin-lock-del").submit();
	var dom = document.getElementById(id);
	if (dom.checked) {
		head.innerHTML = title + " -- LOCKED";
		document.getElementById(id).disabled = true;
		
		//var url = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + "course=" + course + "&subforum=" + subforum + "&postid=" + newid + "&lock=" +newid;
		//window.history.pushState({path:url}, '', url);
		window.location.href = window.location.pathname + "?" + "course=" + course + "&subforum=" + subforum + "&postid=" + newid + "&lock=" +newid;
	}
	else {
		head.innerHTML = title;
	}
	//TODO: lock post
	
}

function logout() {
	
	window.location.href = "admin_index.php";
}

function toAdmin() {
	window.location.href = "admin.php";
}

function toPost(course, subforum, post) {
	
	window.location.href = "admin_viewpost.php?course=" + course + "&subforum=" + subforum + "&postid=" + post;
}