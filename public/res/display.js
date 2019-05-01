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
            output += '<input class="matching" type="text" name="question'+number+'_'+(i+1)+'"> = '+answer[i].answer+'<br>';
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
            answersFromUser.push(question.children[2].children[0].checked) 
        }
        if (type == "multipleChoice"){
            mc = question.children[2].getElementsByClassName(type)
            i = 0
            for (choice of mc){
                if(!choice.checked) {
                    i++;
                    continue;
                }
                else{
                    answersFromUser.push(i);
                }
            }
        }
        if (type == "shortAnswer"){
            answersFromUser.push(question.children[2].children[0].value)
        }
        if (type == "essayAnswer"){
            answersFromUser.push(question.children[2].children[0].value)
        }
        if (type == "matchingTable"){
            inputs = question.children[2].getElementsByTagName("input")
            bruh = []
            for(input of inputs){
                bruh.push(input.value)
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
