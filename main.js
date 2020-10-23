/*THIS JS IS USED FOR DYNAMICALLY GENERATE THE CONTENTS OF EACH COURSE*/
//TODO: Get the number of courses from database for particular student

var  courseName = ["CIS444","CS 421","CS 446","CS 351"];
var subForumName = ["HW", "TEST", "QUIZ", "MISC"];
var numPost = 0;
var date = new Date();
var dd = date.getDate();
var mm = date.getMonth();
var yyyy = date.getFullYear();
var today = mm + "-" + dd + "-" + yyyy;
function writeTable(){
    document.write("<div class=\"forum-div\">\n" +
        "\t\t\t<div class=\"table-format\">\n" +
        "\t\t\t\t<div class=\"item-forum\">Forum</div>\n" +
        "\t\t\t\t<div class=\"item-post\">Posts</div>\n" +
        "\t\t\t\t<div class=\"item-date\">Date</div>\n" +
        "\t\t\t</div>");
    for(let i=0; i < courseName.length; i++){
        document.write("<div class=\"table-format\">\n" +
            "\t\t\t\t<div class=\"course-title\">" + courseName[i] +
            "</div></div>")
        for(let j = 0; j < subForumName.length; j++){
            document.write("<div class=\"table-format\">\n" +
                "\t\t\t\t<div class=\"item-forum item-category\">\n" +
                "\t\t\t\t\t<div class=\"sub-icon\">\n" +
                "\t\t\t\t\t\t<i class=\"fas fa-book-open\"></i>\n" +
                "\t\t\t\t\t</div>\n" +
                "\t\t\t\t\t<div class=\"sub-title\">\n" +
                "\t\t\t\t\t\t<a class=\"sub-heading\" href=\"main.html\">" + subForumName[j]+
                "</a>" +
                "<div class=\"sub-description\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>\n" +
                "\t\t\t\t\t\t<!--it will dynamically display the description of each sub-forum -->\n" +
                "\t\t\t\t\t</div></div>" +
                "<div class=\"item-post\">" + numPost +
                "</div>" +
                "<div class=\"item-date\">" + today + "</div>" +
                "</div>");
        }

    }
    document.write("</div>");
}
writeTable();