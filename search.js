function searchForum(event) {
	//TODO: gather search results from php
	
	//Change "Admin Page" heading to Search Results"
	var heading = document.getElementById("searchheading");
	heading.innerHTML= "Search Results: Click to View";
	
	//Clear results before showing new ones
	removeAllChildNodes(document.getElementById("searchResults"));
	var searchtext = document.getElementById("searchInput");
	searchtext.value = '';
	var results = new Array(); //replace with PHP function call to get results
	results = [["Jason Luu", "101", "CIS444", "TEST", "JavaScript Characteristics"], 
	["Bartholomew Falzarano", "105", "CIS444", "HW", "PHP with JavaScript"]];
	
	
	if (results.length == 0)
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
		for (var i = 0; i < results.length; i++) {
			
			var resultsDisplay = document.createElement("div");
			resultsDisplay.setAttribute("onclick", "goToPost(this.id)");
			resultsDisplay.setAttribute("class", "searchresults");
			resultsDisplay.setAttribute("id", results[i][2]+"-" + results[i][3]+ "-"+results[i][1]);
			var user = document.createElement("p");
			resultsDisplay.innerHTML = '<span class="bolded"> Student: </span>' + results[i][0] ;
			resultsDisplay.appendChild(user);
			var course = document.createElement("p");
			course.innerHTML = '<span class="bolded"> Course: </span>' + results[i][2];
			resultsDisplay.appendChild(course);
			var topic = document.createElement("p");
			topic.innerHTML = '<span class="bolded">Subforum: </span>' + results[i][3];
			resultsDisplay.appendChild(topic);
			var description = document.createElement("p");
			description.innerHTML = '<span class="bolded">Title: </span>' + results[i][4];
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
	window.location.href="viewpost.html?course="+course+"subforum="+subforum+ "postid="+postID;
}


