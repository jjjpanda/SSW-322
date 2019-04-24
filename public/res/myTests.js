var test;

window.onload = function() {
    listTestsSurveys(localStorage)
}

function listTestsSurveys() {
    for ( var i = 0, len = localStorage.length; i < len; ++i ) {
        console.log(i);
        if (localStorage.getItem(localStorage.key(i))[type] == "test") {
            writeToScreen(format(i), "tests")
        }
        else if (localStorage.getItem(localStorage.key(i))[type] == "surveys") {
            writeToScreen(format(i), "surveys")
        }

        console.log(i);
      }

    for(test of testList) {
        if (test[type] == "test") {
            writeToScreen(test)
        }
    }
}

function format(title) {
    output = "<h1>"+title+"</h1>"
    output += ""
    return output
}

function showTest(testName) {
    localStorage.setItem("testToLoad", testName)
    window.location.href ='displayTest.html'
}

function writeToScreen(text, div) {
    output = document.getElementById(div);
    var pre = document.createElement("p");
	pre.innerHTML = text;
    output.appendChild(pre);
}
