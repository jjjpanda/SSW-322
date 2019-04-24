window.onload = function() {
    listTestsSurveys(localStorage)
}

function listTestsSurveys() {
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        if (localStorage.key(i) == "displayTestName" || !localStorage.getItem(localStorage.key(i)).startsWith("{")) {
            ""
        }
        else if (JSON.parse(localStorage.getItem(localStorage.key(i)))["type"] == "test") {
            writeToDiv(format(localStorage.key(i)), "tests")
        }
        else if (JSON.parse(localStorage.getItem(localStorage.key(i)))["type"] == "survey") {
            writeToDiv(format(localStorage.key(i)), "surveys")
        }
    }
}

function format(title) {
    return '<button class="button" onclick="showTest(\''+title+'\')">'+title+'</button>'
}

function showTest(testName) {
    localStorage["displayTestName"] = testName
    window.location.href ='modifyTest.html'
}

function writeToDiv(text, div) {
    output = document.getElementById(div);
    if (output.innerHTML == "You have no tests")
        output.innerHTML = "<h1>Test List</h1>"
    if (output.innerHTML == "You have no surveys")
        output.innerHTML = "<h1>Survey List</h1>"
    var pre = document.createElement("p");
	pre.innerHTML = text;
    output.appendChild(pre);
}
