function searchForum(results) {
	var len = 0;
	//TODO: gather search results from php
	try {
		len = results.length;
	}catch(err) {}
	
	//Change "Admin Page" heading to Search Results"
	var heading = document.getElementById("searchheading");
	heading.innerHTML= "Search Results";
	
	//Clear results before showing new ones
	removeAllChildNodes(document.getElementById("searchResults"));
	var searchtext = document.getElementById("searchInput");
	searchtext.value = '';
//	var results = new Array(); //replace with PHP function call to get results
	
	
	if (len == 0)
	{
		var dom = document.getElementById("resultsInstr");
		dom.style.visibility = "hidden";
		var resultsDisplay = document.createElement("div");
		resultsDisplay.setAttribute("class", "searchresults");
		var innerP = document.createElement("p");
		innerP.innerHTML = "No matching search results.";
		resultsDisplay.appendChild(innerP);
		document.getElementById("searchResults").appendChild(resultsDisplay);
	}
	else {
		
		var dom = document.getElementById("resultsInstr");
		dom.style.visibility = "visible";
		for (var i = 0; i < len; i++) {
			
			var resultsDisplay = document.createElement("div");
			resultsDisplay.setAttribute("onclick", "goToPost(this.id)");
			resultsDisplay.setAttribute("class", "searchresults");
			resultsDisplay.setAttribute("id", results[i][4]+"-" + results[i][3]+ "-"+results[i][0]);
			var user = document.createElement("p");
			resultsDisplay.innerHTML = '<span class="bolded"> Student: </span>' + results[i][5] + " " +results[i][6];
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

function goToPost(id) {
	//TODO: redirect user to post
	var courseEnd = id.search(/-/);
	var course = id.substring(0, courseEnd);
	id = id.replace(course+"-", "");
	var subforumEnd = id.search(/-/);
	var subforum = id.substring(0, subforumEnd);
	var postID = id.substring(subforumEnd+1);
	window.location.href="viewpost.php?course="+course+"&subforum="+subforum+ "&postid="+postID;
}


