function toLogin() {
	window.location.href= "login.php";
	
}
/*THIS JS IS USED FOR DYNAMICALLY GENERATE THE CONTENTS OF EACH COURSE*/
//TODO: Get the number of courses from database for particular student


function writeTable(courses){

	var courseName = courses;
	//courseName = [["CIS444", "HW" ,"4", "11-18-2020"],["CIS444","TEST" ,"2", "11-18-2020"], ["CIS444","QUIZ" ,"0", "11-18-2020"], ["CIS444","OTHER/MISC" ,"0", "11-18-2020"], 
	//			["CS351","HW" ,"0", "11-18-2020"],["CS351","TEST" ,"0", "11-18-2020"], ["CS351","QUIZ" ,"0", "11-18-2020"], ["CS351","OTHER/MISC" ,"0", "11-18-2020"]];

    
	try {
		var len = courseName.length;
		//console.log(len);
	} catch (err) {};
	//Case of not having any class
    if(len == 0){
		var noclass = document.createElement("div");
		noclass.setAttribute("class", "no-class");
		noclass.innerHTML = "You are not enrolled in any course forums. Please add your current courses to your profile to view your courses' forums.";
    	document.getElementById("forum-div").appendChild(noclass);
	}
    //Case of having class
    else if (len >= 1){
        // Create table-format div
        var table_format_heading = document.createElement("div");
        table_format_heading.setAttribute("class","table-format");
        document.getElementById("forum-div").appendChild(table_format_heading);
        // Create Forum column
        var forum_col = document.createElement("div");
        forum_col.setAttribute("class","item-forum");
        forum_col.innerHTML = "Forum";
        table_format_heading.appendChild(forum_col);
        //Create Post column
        var post_col = document.createElement("div");
        post_col.setAttribute("class","item-post");
        post_col.innerHTML = "Posts";
        table_format_heading.appendChild(post_col);
        //Create Date Column
        var date_col = document.createElement("div");
        date_col.setAttribute("class","item-date");
        date_col.innerHTML = "Date";
        table_format_heading.appendChild(date_col);


        for(let i = 0; i<len;i++) {
			
            var table_format_courseName = document.createElement("div");
            table_format_courseName.setAttribute("class", "table-format");
            document.getElementById("forum-div").appendChild(table_format_courseName);
			var courseexists = document.getElementById(courseName[i][0]);
			if (!courseexists){
				var course_node = document.createElement("div");
				course_node.setAttribute("class", "course-title");
				course_node.innerHTML = courseName[i][0];
				course_node.setAttribute("id", courseName[i][0]);
				table_format_courseName.appendChild(course_node);
			}
			//for (let j = 1; j < courseName.length; j++){
                var table_format_subForum = document.createElement("div");
                table_format_subForum.setAttribute("class", "table-format");
				table_format_subForum.setAttribute("id", courseName[i][0]+"-" + courseName[i][1]);
                document.getElementById("forum-div").appendChild(table_format_subForum);
                var subForum_node = document.createElement("div");
                subForum_node.setAttribute("class","item-forum item-category")
                table_format_subForum.appendChild(subForum_node);
                var sub_icon_node = document.createElement("div");
                sub_icon_node.setAttribute("class", "floatleft");
				sub_icon_node.setAttribute("style", "margin-left: 10px");
                subForum_node.appendChild(sub_icon_node);
                var icon = document.createElement("i");
                icon.setAttribute("class", "fas fa-book-open");
                sub_icon_node.appendChild(icon);
                var sub_title_node = document.createElement("div");
                sub_title_node.setAttribute("class", "sub-title");
                subForum_node.appendChild(sub_title_node);
                var sub_heading_node = document.createElement("div");
                sub_heading_node.setAttribute("class", "sub-heading");
				var param = document.getElementById(courseName[i][0]+"-" + courseName[i][1]);
                sub_heading_node.setAttribute("onclick", "goToSubforum('"+param.id+"');");
                sub_heading_node.innerHTML = courseName[i][1];
                sub_title_node.appendChild(sub_heading_node);
                var sub_description_node = document.createElement("div");
                sub_description_node.setAttribute("class", "sub-description small-font");
                sub_description_node.innerHTML = "Click to view the posts in the " + courseName[i][1] + " subforum for " + courseName[i][0] + ".";
                sub_title_node.appendChild(sub_description_node);
                var post_col_node = document.createElement("div");
                post_col_node.setAttribute("class", "item-post");
                post_col_node.innerHTML = "" + courseName[i][2];
                table_format_subForum.appendChild(post_col_node);
                var date_col_node = document.createElement("div");
                date_col_node.setAttribute("class", "item-date");
                date_col_node.innerHTML = courseName[i][3];
                table_format_subForum.appendChild(date_col_node);
            
        }
    }



}

function goToSubforum(forum) {
	var pos = forum.search(/-/);
	var course = forum.substring(0, pos);
	var subforum = forum.substring(pos+1);
	window.location.href = "subforum.php?course="+course+"&subforum="+subforum;
}
