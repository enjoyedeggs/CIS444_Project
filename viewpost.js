/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var banbutton;
var replybtn;
var forumname;
var admin;
var course;
var subforum;
var post;
var queryPos;
var title= "Post Title from Database for PostID";
function getInfo() {
	forumName = (window.location).toString();
	var pos = forumName.search(/\?/);
	queryPos = pos;
	if (pos > 0){
		var coursePos = forumName.search(/course=/);
		var subforumPos = forumName.search(/subforum=/);
		var postPos = forumName.search(/postid=/);
		var adminPos = forumName.search(/admin=/);
		course = forumName.substring(coursePos+7, subforumPos);
		post = forumName.substring(postPos, adminPos);
		subforum = forumName.substring(subforumPos+9, postPos);
		admin = forumName.substring(adminPos+6);
		forumName = course + " " + subforum;
		console.log('"'+ admin + '"');
		checkAdmin("admin-section", "user-controls" , admin);
		var posth = document.getElementById("post-header");
		posth.innerHTML = "Post Title from Database for PostID"; //Placeholder for PHP
		var profilebox = document.getElementById("profile-pic");
		var profilepic = document.createElement("img");
		
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
		alert("Cannot access this page without selecting a forum on the main page. You will be redirected to the main page.");
		window.location.href = "main.html";
	}
}
function checkAdmin(adminsec, usersec, admin) {
	console.log(adminsec + " " + usersec);
		if (admin === "true"){
			var adminsec = document.getElementById(adminsec);
			adminsec.style.visibility="visible";
		}
		else {
			var usercont = document.getElementById(usersec);
			usercont.style.visibility="visible";
		}
}
function getUserName(postid) {
	return "Post Author";
}

function getPostContent(postid) {
	return "Post content that will be retrieved from database will appear here. This is a placeholder.";
}

function getReplies(postid) {
	var replies = new Array(); //Placeholder for PHP function
	//replies = [["Reply Title", "Post Author", "postid123", "Post Content goes here"], 
	//["Reply Title", "Post Author", "postid234", "Post Content goes here"]];
	var replies_dom = document.getElementById("replies");
	if (replies.length == 0) {
		replies_dom.innerHTML = 'This post does not have any replies yet.';
		replies_dom.setAttribute("class", "reply-msg");
	}
	else {
		for (var i = 0; i < replies.length; i++) {
			var postDiv = document.createElement("div");
			postDiv.setAttribute("class", "vpcontainer");
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
			user.innerHTML = getUserName(replies[i][2]);
			authorsec.appendChild(user);
			var bodycont = document.createElement("div");
			bodycont.setAttribute("class", "bodybox");
			bodycont.innerHTML = getPostContent(replies[i][2]);
			
			profile_sec.appendChild(authorsec);
			profile_sec.appendChild(bodycont);
			
			var userControls = document.createElement("div");
			userControls.setAttribute("id", replies[i][2]+"user-controls");
			userControls.setAttribute("class", "viewprofilebuttons hidden-subforum");
			
			var flagLbl = document.createElement("label");
			flagLbl.setAttribute("class", "flag-post floatright");
			flagLbl.setAttribute("for", "flag"+replies[i][2]);
			var flaginput = document.createElement("input");
			flaginput.setAttribute("type", "checkbox");
			flaginput.setAttribute("id", "flag"+replies[i][2]);
			flaginput.setAttribute("onchange", "Flagfunc(this,'" + replies[i][2]+"post-header');");
			flagLbl.innerHTML = "Flag Post" ;
			flagLbl.appendChild(flaginput);
			var replyBtn = document.createElement("button");
			replyBtn.setAttribute("id", replies[i][2]+"b");
			replyBtn.setAttribute("onclick", "newPostReply(this.id)");
			replyBtn.innerHTML = "Reply";
			userControls.appendChild(flagLbl);
			userControls.append(replyBtn);
			
			var adminControls = document.createElement("div");
			adminControls.setAttribute("id", replies[i][2]+"admin-controls");
			adminControls.setAttribute("class", "hidden-subforum admin-controls");
			var adminDel = document.createElement("button");
			adminDel.setAttribute("id", replies[i][2]+"admin");
			adminDel.setAttribute("onclick", "deletePost(this.id)");
			adminDel.innerHTML = "Delete Post";
			adminControls.appendChild(adminDel);
			var lockLbl = document.createElement("label");
			lockLbl.setAttribute("for", "lock"+replies[i][2]);
			lockLbl.innerHTML = "Lock Reply";
			var lockInput = document.createElement("input");
			lockInput.setAttribute("type" , "checkbox");
			lockLbl.appendChild(lockInput);
			adminControls.appendChild(lockLbl);
			
			
			
			
			postDiv.appendChild(profile_sec);
			postDiv.appendChild(userControls);
			postDiv.appendChild(adminControls);
			replies_dom.appendChild(postDiv);
			checkAdmin(replies[i][2]+"admin-controls", replies[i][2]+"user-controls", admin);
		}
		
	}
}

function newReply() {
	window.location.href = "new_post.html?"+ (window.location).toString().substring(queryPos+1);
}

function newPostReply(id) {
	id = id.substring(0, id.length - 1);
	window.location.href = "new_post.html?course=" + course + "subforum=" + subforum + "postid=" + id + "admin=" + admin;
	console.log(course + " " + subforum + " " + id + " " + admin);
}

// function reply(){
    // document.getElementById("rplybutton").disabled=true;
    // /* container for post */
    // var post = document.createElement("div");
    // post.className='vpcontainer';
    // /***********************/
    // /* container for header */ 
    // var header = document.createElement("div"); 
    // header.className='headerbox';
    // var flagbutton = document.createElement("input");
    // copyAttrs(document.getElementById("flag"),flagbutton);
    // var flabel = document.createElement("LABEL");
    // flabel.innerHTML='Flag';
    // header.appendChild(flagbutton);
    // header.appendChild(flabel);
    // /**********************/
    
    // /* container for body */
    // var postbody = document.createElement("div");
    // postbody.className='profileandbody';
    // /********************************/
    // /* container for body */ 
    // var profilesection = document.createElement("div");
    // profilesection.className='profilebox';
    // var profpic = document.createElement("img"); 
    // profpic.src='images/profilepicture.png';
    // profpic.className='profilebox > img';
    // var user = document.createElement("div"); 
    // user.innerHTML='CoolDude';
    // var rptbutton = document.createElement("button");
    // rptbutton.innerHTML="report";
    // rptbutton.setAttribute('onclick','reportuser();');
    // //banbutton = document.createElement("button");
    // //banbutton.innerHTML="ban";
    // //copyAttrs(document.getElementById("banbtn"),banbutton);
    // profilesection.appendChild(profpic);
    // profilesection.appendChild(user);
    // profilesection.appendChild(rptbutton);
    // //profilesection.appendChild(banbutton);
    // postbody.appendChild(profilesection);
    // /***********************************/
    // var bodysection = document.createElement("div");
    // bodysection.className='bodybox';
    // var replytext = document.createElement("div");
    // replytext.innerHTML="Have you tried looking at PEMDAS?";
    // bodysection.appendChild(replytext);
    // postbody.appendChild(bodysection);
    // /*******************************************/
    // /* container for footer buttons */
    // var footer = document.createElement("div"); 
    // footer.className='viewprofilebuttons';
    // replybtn = document.createElement("button"); 
    // replybtn.innerHTML="reply";
    
    // footer.appendChild(replybtn);
    // postbody.appendChild(footer);
    // /***********************/ 
    
    // post.appendChild(header);
    // post.appendChild(postbody);
    // post.append(footer);
    // document.body.appendChild(post);
    
    
// }
// const copyAttrs = (from, to) =>
    // Array.from(from.attributes)
        // .forEach(node => 
            // to.setAttributeNode(node.cloneNode(true)));

function Flagfunc(element, header)
{
    var head = document.getElementById(header);
	head.innerHTML += " -- FLAGGED";
	element.disabled = true;
}
// function toggleLock(element){
    // var rplybtn=document.getElementById("rplybutton");
    // if(element.checked){
        // alert("Post is Locked");
        // rplybtn.style.display='none';
	// if(rplybtn.disabled){
	// replybtn.style.display='none';
	// }
	
    // }
    // else{
        // alert("Post is unlocked");
        // rplybtn.style.display='block';
	// if(rplybtn.disabled==true)
	// {
		// replybtn.style.display='block';
	// }
	
    // }
    
// }
// function reportuser(){
    // alert("user has been reported");
// }
// function adminenabled(){
    // //document.getElementById("lock").style.display="block";
    // //document.getElementById("locklabel").style.display="block";
    // //document.getElementById("banbtn").style.display="block";
    // if(document.getElementById("rplybutton").disabled)
    // {
        // banbutton.style.display="block";
    // }
// }
// function admindisabled(){
    // document.getElementById("lock").style.display="none";
    // document.getElementById("locklabel").style.display="none";
    // //document.getElementById("banbtn").style.display="none";
    // if(document.getElementById("rplybutton").disabled==true)
    // {
        // banbutton.style.display="none";
    // }
// }

function deletePost() {
	var postID = post;
	var subs = postID.substring(0, postID.length - 2);
	var dom = document.getElementById(subs);
	var head = document.getElementById("post-header");
	head.innerHTML += " -- DELETED";
	
	//Disable Lock Checkbox
	document.getElementById("lockpost").disabled = true;
	
	//TODO: delete post from database
	

	
	
}

function lockPost() {
	var postID = post;
	var head = document.getElementById("post-header");
	head.innerHTML = title + " -- LOCKED";
	//TODO: lock post
	
}