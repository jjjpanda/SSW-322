/*var firestore
var currentUser
var currentUID
setTimeout(func, 5000);

function func() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCKb8456ADN7ru83vdjrRtDyZhQIStCOIQ",
        authDomain: "ssw322survey.firebaseapp.com",
        databaseURL: "https://ssw322survey.firebaseio.com",
        projectId: "ssw322survey",
        storageBucket: "ssw322survey.appspot.com",
        messagingSenderId: "36336841397"
        };
        if (firebase.apps.lengh == 0)
            firebase.initializeApp(config);
        firestore = firebase.firestore();
        currentUser = firebase.auth().currentUser;
        if (currentUser == null){
            currentUser = firebase.auth().currentUser;
        }
        currentUID = currentUser.uid;
}
var test;

function pullDataBase(testName){
    newTestDBPath = "questionnaires/tests/" + currentUID + "/" + testName + "/";
    return firestore.doc(newTestDBPath).get(test);
}*/

window.onload = function() {
    testname = localStorage.getItem("displayTestName")
    test = JSON.parse(localStorage.getItem(testname))
    //test = JSON.parse(pullDataBase(testname))
    document.getElementById("testTitle").innerText=testname
    console.log(test)
    displayTest(test["questions"]);
}

function displayTest(test) {
    for(question of test) {
        console.log(question.questionType, question.number, question.prompt, question.answerChoices, question.answer)
        writeToScreen(displayQuestion(question.questionType, question.number, question.prompt, question.answerChoices, question.answer))
    }
}

function displayQuestion(type, number, prompt, answers, answer) {
    if (type == "trueFalse"){
        output = '<div class="question"><span class="questionNumber">'+number+' </span><span class="questionPromptDisplay">'+prompt+'</span><div class="questionAnswers">'
        output += '<input class="trueFalse" type="radio" name="question'+number+'" value="option1"'
        //if (answer)
        //    output += 'checked'
        output +='> True<br>'
        output += '<input class="trueFalse" type="radio" name="question'+number+'" value="option2"'
        //if (!answer)
        //    output += 'checked'
        output += '> False<br></div></div><br>'
        return output + "<hr/>"
    }
    if (type == "multipleChoice"){
        output = '<div class="question"><span class="questionNumber">'+number+' </span><span class="questionPromptDisplay">'+prompt+'</span><div class="questionAnswers">'
        for (i = 0; i < answers.length; i++) {
            output += '<input class="multipleChoice" type="radio" name="question'+number+'" value="option'+i+'"'
        //    if (answer === i)
        //        output += 'checked'
            output += '>'+answers[i]+'<br>'
        }
        output += '</div></div><br>'
        return output  + "<hr/>";
    }
    if (type == "shortAnswer"){
        return '<div class="question"><span class="questionNumber">'+number+' </span><span class="questionPromptDisplay">'+prompt+'</span><div class="questionAnswers"><input class="shortAnswer" type="text" name="question'+number+'"></div></div><br></br>'  + "<hr/>"
    }
    if (type == "essayAnswer"){
        return '<div class="question"><span class="questionNumber">'+number+' </span><span class="questionPromptDisplay">'+prompt+'</span><div class="questionAnswers"><input class="essayAnswer" type="text" name="question'+number+'"></div></div><br>'  + "<hr/>"
    }
    if (type == "matching"){
        output = '<div class="question"><span class="questionNumber">'+number+' </span><span class="questionPromptDisplay">'+prompt+'</span><div class="questionAnswers"><table class="matchingTable"><th>Choices</th>';
        rand = [].concat(answer);
        rand = shuffle(rand)
        for (i = 0; i < answer.length; i++) {
            output += '<tr><td>'+rand[i].prompt+'</td></tr>';
        }
        output += '</table>';
        for (i = 0; i < answer.length; i++) {
            output += '<div class="matching"><input type="text" name="question'+number+'_'+(i+1)+'"><div id = "matchPrompt">= '+answer[i].answer+'</div></div><br>';
        }
        output += '</div></div><br>';
        return output  + "<hr/>";
    }
    if (type == "ranking"){
        output = '<div class="question"><span class="questionNumber">'+number+' </span><span class="questionPromptDisplay">'+prompt+'</span><div class="questionAnswers"><table class="rankingTable"><th>Choices</th>';
        var rand = [].concat(answer);
        rand = shuffle(rand)
        for (i = 0; i < answer.length; i++) {
            output += '<tr><td>'+rand[i]+'</td></tr>';
        }
        output += '</table>';
        for (i = 0; i < answer.length; i++) {
            output += (i+1)+') <input class="ranking" type="text" name="question'+number+'_'+(i+1)+'" ><br>'
        }
        output += '</div></div><br>';
        return output  + "<hr/>";
    }
}

function submit(){
    answersFromUser = []
    questions = document.getElementsByClassName("question")

    for ( question of questions ){
        type = question.children[2].children[0].className
        if (type == "trueFalse"){
            if(question.children[2].children[0].checked){
                answersFromUser.push(true)
            }
            else if(question.children[2].children[0].checked){
                answersFromUser.push(false)
            }
            else{
                answersFromUser.push(0)
            }
             
        }
        if (type == "multipleChoice"){
            mc = question.children[2].getElementsByClassName(type)
            i = 0
            foundAnswer = false;
            for (choice of mc){
                if(!choice.checked && !foundAnswer) {
                    i++;
                    continue;
                }
                else{
                    answersFromUser.push(i);
                    foundAnswer = true;
                    break;
                }
            }
            if(!foundAnswer){
                answersFromUser.push(-1);
            }
            
        }
        if (type == "shortAnswer"){
            answersFromUser.push(question.children[2].children[0].value)
        }
        if (type == "essayAnswer"){
            answersFromUser.push(question.children[2].children[0].value)
        }
        if (type == "matchingTable"){
            inputs = question.children[2].getElementsByClassName("matching")
            bruh = []
            for(input of inputs){
                bruh.push({'prompt':input.getElementsByTagName('input')[0].value,'answer':input.getElementsByTagName('div')[0].innerText.substring(2)})
            }
            answersFromUser.push(bruh);
        }
        if (type == "rankingTable"){
            inputs = question.children[2].getElementsByTagName("input")
            bruh = []
            for(input of inputs){
                bruh.push(input.value)
            }
            answersFromUser.push(bruh);
        }
    }
    console.log(answersFromUser)
    var answersFromKey = false;
    console.log(test.type)
    if(test.type === 'test'){
        answersFromKey = test.questions.map(element => element.answers)
        console.log(answersFromKey)
        determineCorrectness(answersFromKey, answersFromUser)
    }
}

function boolin(boolboy){
    return true === boolboy
}

function determineCorrectness(answers, answersFromUser){
    questionsOnScreen = document.getElementById("questionDiv").getElementsByTagName("p")
    for(i = 0; i< answers.length; i++){
        if(answers[i] instanceof Array){
            correctness = []
            for(j = 0; i<answers[i].length; i++){
                if(answers[i][j] instanceof Object){
                    correctness.push(isObjEquivalent(answers[i][j], answersFromUser[i][j]))
                }
                else{
                    correctness.push(answers[i][j] === answersFromUser[i][j])
                }
            }
            printCorrectness(questionsOnScreen[i], correctness.every(boolin))
        }
        else if(answers[i] === answersFromUser[i]){
            printCorrectness(questionsOnScreen[i], true)
        }
        else{
            printCorrectness(questionsOnScreen[i], false)
        }
    }
}

function printCorrectness(element, correctness){
    var pre = document.createElement("div");
    if(correctness){
        pre.innerHTML = "Correct";
    }
    else{
        pre.innerHTML = "Wrong";
    }
    element.appendChild(pre);
}

function isObjEquivalent(a, b) { //http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}

function writeToScreen(text) {
    output = document.getElementById("questionDiv");
    var pre = document.createElement("p");
	pre.innerHTML = text;
    output.appendChild(pre);
}

function shuffle(a) { //https://stackoverflow.com/a/6274381
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
