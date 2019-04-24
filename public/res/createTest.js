
var config = {
  apiKey: "AIzaSyCKb8456ADN7ru83vdjrRtDyZhQIStCOIQ",
  authDomain: "ssw322survey.firebaseapp.com",
  databaseURL: "https://ssw322survey.firebaseio.com",
  storageBucket: "bucket.appspot.com"
};
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
firebase.initializeApp(config);

// Get a reference to the database service
var db = firebase.database();
console.log(user.uid);
db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
});
var test = {"type":"test", "questions":{}, "answerChoices":{}, "correctAnswers":{}};
//type:"test", question:{}, answers:{}
var questionNumber = 1
var formType = 'test'

function changeType(type) {
    if (type == 'test' &&  test['type'] != 'test') {
        test['type'] = type;
        document.getElementById("testTypeButton").classList.add("typeSelected");
        document.getElementById("surveyTypeButton").classList.remove("typeSelected");
        //test form code here
    }
    else if (type == 'survey' &&  test['type'] != 'survey') {
        test['type'] = type;
        document.getElementById("surveyTypeButton").classList.add("typeSelected");
        document.getElementById("testTypeButton").classList.remove("typeSelected");
        //survey form code here
    }
}

function writeQuestion(type) {
    writeToScreen(addQuestion(type, questionNumber));
    questionNumber++;
    var x = document.getElementById("submitButton");
    if(questionNumber > 1){
        x.style.display = "block";
    }
    console.log(test)
}

function writeToScreen(text) {
    output = document.getElementById("questionDiv");
    var pre = document.createElement("p");
	pre.style.wordWrap = "break-word";
	pre.innerHTML = text;
    output.appendChild(pre);
    showDeleteButton()
}
function hideDeleteButton() {
    var x = document.getElementById("deleteButton");
    if (x.style.display === "block") {
      x.style.display = "none";
    }
}

function showDeleteButton() {
    var x = document.getElementById("deleteButton");
    if (x.style.display === "none") {
      x.style.display = "block";
    }
}

function deleteLastQuestion() {
    output = document.getElementById("questionDiv");
    if (output.lastChild != null) {
        output.removeChild(output.lastChild);
        test.pop();
        questionNumber--;
    }
    var x = document.getElementById("submitButton");
    if (questionNumber == 1){
        hideDeleteButton()
        x.style.display = "none";
    }

}

function addQuestion(type, number) {
    if (type == "trueFalse"){
        test.push({'questionType':'trueFalse', 'number':number});
        return '<div class="question"><span class="questionNumber">'+number+'</span><input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt"><div class="questionAnswers" id="question'+number+'Answers"><input class="trueFalse" type="radio" name="question'+number+'" placeholder="option1"> True<br><input class="trueFalse" type="radio" name="question'+number+'" placeholder="option2"> False<br></div></div><br>';
    }
    if (type == "multipleChoice"){
        test.push({'questionType':'multipleChoice', 'number':number});
        output = '<div class="question"><span class="questionNumber">'+number+'</span><input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt"><div class="questionAnswers" id="question'+number+'Answers"></div>'
        output += '<button class="addButton" onclick="addMultipleChoiceAnswer(document.getElementById(\'question'+number+'Answers\'), '+number+')">+</button>';
        output += '<button class="addButton" onclick="delMultipleChoiceAnswer(document.getElementById(\'question'+number+'Answers\'))">-</button></div>';
        return output;
    }
    if (type == "shortAnswer"){
        test.push({'questionType':'shortAnswer', 'number':number});
        return '<div class="question"><span class="questionNumber">'+number+'</span><input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt"><div class="questionAnswers" id="question'+number+'Answers"><input class="shortAnswer" type="text" name="question'+number+'" placeholder="Short Answer"></div></div><br>';
    }
    if (type == "essayAnswer"){
        test.push({'questionType':'essayAnswer', 'number':number});
        return '<div class="question"><span class="questionNumber">'+number+'</span><input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt"><div class="questionAnswers" id="question'+number+'Answers"><input class="essayAnswer" type="text" name="question'+number+'" placeholder="Essay Answer"></div></div><br>';
    }
    if (type == "matching"){
        test.push({'questionType':'matching', 'number':number});
        output = '<div class="question"><span class="questionNumber">'+number+'</span><input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt"><div class="questionAnswers" id="question'+number+'Answers"></div>'
        output += '<button class="addButton" onclick="addMatchingChoiceAnswer(document.getElementById(\'question'+number+'Answers\'), '+number+')">+</button>';
        output += '<button class="addButton" onclick="delMatchingChoiceAnswer(document.getElementById(\'question'+number+'Answers\'))">-</button></div>';
        return output;
    }
    if (type == "ranking"){
        test.push({'questionType':'ranking', 'number':number});
        output = '<div class="question"><span class="questionNumber">'+number+'</span><input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt"><br><div class="questionAnswers" id="question'+number+'Answers"></div>';
        output += '<button class="addButton" onclick="addRankingChoiceAnswer(document.getElementById(\'question'+number+'Answers\'), '+number+')">+</button>';
        output += '<button class="addButton" onclick="delRankingChoiceAnswer(document.getElementById(\'question'+number+'Answers\'))">-</button></div>';
        return output;
    }
}

function addMultipleChoiceAnswer(answerDIV, number) {
    var pre = document.createElement("div");
    pre.innerHTML = '<input class="multipleChoice" type="radio" name="question'+number+'" placeholder="option'+answerDIV.children.length+'"><input class="questionPromptCreate" type="text" name="question'+number+'Text'+answerDIV.children.length+'" placeholder="Question Answer"><br>';
    answerDIV.appendChild(pre)
}

function delMultipleChoiceAnswer(answerDIV) {
    answerDIV.removeChild(answerDIV.lastChild);
}

function addMatchingChoiceAnswer(answerDIV, number) {
    var pre = document.createElement("div");
    pre.innerHTML = '<input class="matchningPromptCreate" type="text" name="question'+number+'_'+answerDIV.children.length+'_1" placeholder="Question Prompt"> = <input class="matchningPromptCreate" type="text" name="question'+number+'_'+answerDIV.children.length+'_2" placeholder="Question Answer"></input>';
    answerDIV.appendChild(pre)
}

function delRankingChoiceAnswer(answerDIV) {
    answerDIV.removeChild(answerDIV.lastChild);
}

function addRankingChoiceAnswer(answerDIV, number) {
    var pre = document.createElement("div");
    pre.innerHTML = '<input class="rankingPromptCreate" type="text" name="question'+number+'_'+answerDIV.children.length+'" placeholder="Question Answer '+(answerDIV.children.length+1)+'">';
    answerDIV.appendChild(pre)
}

function delMatchingChoiceAnswer(answerDIV) {
    answerDIV.removeChild(answerDIV.lastChild);
}
