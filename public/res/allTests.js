var test;

window.onload = function() {
    listTestsSurveys(localStorage)
}

function listTestsSurveys() {
    for ( var i = 1, len = localStorage.length; i < len; ++i ) {
        console.log(i);
        if (JSON.parse(localStorage.getItem(localStorage.key(i)))["type"] == "test") {
            writeToScreen(format(localStorage.key(i)), "tests")
        }
        else if (JSON.parse(localStorage.getItem(localStorage.key(i)))["type"] == "surveys") {
            writeToScreen(format(localStorage.key(i)), "surveys")
        }
    }
}

function format(title) {
    output = "<h1 onclick='showTest("+title+")'>"+title+"</h1>"
    return output
}

function showTest(testName) {
    localStorage.setItem("demo", testName)
    window.location.href ='displayTest.html'
}

function writeToScreen(text, div) {
    output = document.getElementById(div);
    if (output.innerHTML == "You have no tests" || output.innerHTML == "You have no surveys")
        output.innerHTML = ""
    var pre = document.createElement("p");
	pre.innerHTML = text;
    output.appendChild(pre);
}
