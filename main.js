/*THIS JS IS USED FOR DYNAMICALLY GENERATE THE CONTENTS OF EACH COURSE*/
//TODO: Get the number of courses from database for particular student

var courseName = new Array();
courseName = ["CIS 444", "CS 446", "CS 441", "CS 446"];
var subForumName = ["HW", "TEST", "QUIZ", "MISC"];
var numPost = 0;
var date = new Date();
var dd = date.getDate();
var mm = date.getMonth();
var yyyy = date.getFullYear();
var today = mm + "-" + dd + "-" + yyyy;
function writeTable(){
    //Case of not having any class
    if(courseName.length === 0){
        document.write("<div class='no-class'>You are not enrolled in any course forums. Please add your current courses to your profile to view your courses' forums.</div>")
    }
    //Case of having class
    else{
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
        post_col.innerHTML = "Post";
        table_format_heading.appendChild(post_col);
        //Create Date Column
        var date_col = document.createElement("div");
        date_col.setAttribute("class","item-date");
        date_col.innerHTML = "Date";
        table_format_heading.appendChild(date_col);


        for(let i = 0; i<courseName.length;i++){
            var table_format_courseName = document.createElement("div");
            table_format_courseName.setAttribute("class", "table-format");
            document.getElementById("forum-div").appendChild(table_format_courseName);
            var course_node = document.createElement("div");
            course_node.setAttribute("class", "course-title");
            course_node.innerHTML = courseName[i];
            table_format_courseName.appendChild(course_node);
            for(let j = 0; j<subForumName.length;j++){
                var table_format_subForum = document.createElement("div");
                table_format_subForum.setAttribute("class", "table-format");
                document.getElementById("forum-div").appendChild(table_format_subForum);
                var subForum_node = document.createElement("div");
                subForum_node.setAttribute("class","item-forum item-category")
                table_format_subForum.appendChild(subForum_node);
                var sub_icon_node = document.createElement("div");
                sub_icon_node.setAttribute("class", "floatleft");
                subForum_node.appendChild(sub_icon_node);
                var icon = document.createElement("i");
                icon.setAttribute("class", "fas fa-book-open");
                sub_icon_node.appendChild(icon);
                var sub_title_node = document.createElement("div");
                sub_title_node.setAttribute("class", "sub-title");
                subForum_node.appendChild(sub_title_node);
                var sub_heading_node = document.createElement("a");
                sub_heading_node.setAttribute("class", "sub-heading");
                sub_heading_node.setAttribute("href", "homework.html");
                sub_heading_node.innerHTML = subForumName[j];
                sub_title_node.appendChild(sub_heading_node);
                var sub_description_node = document.createElement("div");
                sub_description_node.setAttribute("class", "sub-description small-font");
                sub_description_node.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                sub_title_node.appendChild(sub_description_node);
                var post_col_node = document.createElement("div");
                post_col_node.setAttribute("class", "item-post");
                post_col_node.innerHTML = "" + numPost;
                table_format_subForum.appendChild(post_col_node);
                var date_col_node = document.createElement("div");
                date_col_node.setAttribute("class", "item-date");
                date_col_node.innerHTML = today;
                table_format_subForum.appendChild(date_col_node);
            }
        }
    }



}
writeTable();