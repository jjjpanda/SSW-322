//TODO: Add number of desired answers to addQuestion method
var test = [];
var questionNumber = 1
var formType = 'test'
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
        return '<div class="question"><span class="questionNumber">'+number+'</span><input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt"><div class="questionAnswers" id="question'+number+'Answers"><input class="matchningPromptCreate" type="text" name="question'+number+'_1_1" placeholder="Question Prompt">=<input class="matchningPromptCreate" type="text" name="question'+number+'_1_2" placeholder="Question Answer"><br><input class="matchningPromptCreate" type="text" name="question'+number+'_2_1" placeholder="Question Prompt">=<input class="matchningPromptCreate" type="text" name="question'+number+'_2_2" placeholder="Question Answer"><br><input class="matchningPromptCreate" type="text" name="question'+number+'_3_1" placeholder="Question Prompt">=<input class="matchningPromptCreate" type="text" name="question'+number+'_3_2" placeholder="Question Answer"><br><input class="matchningPromptCreate" type="text" name="question'+number+'_4_1" placeholder="Question Prompt">=<input class="matchningPromptCreate" type="text" name="question'+number+'_4_2" placeholder="Question Answer"></div></div><br>';
    }
    if (type == "ranking"){
        test.push({'questionType':'ranking', 'number':number});
        return '<div class="question"><span class="questionNumber">'+number+'</span><input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt"><br><div class="questionAnswers" id="question'+number+'Answers"><input class="rankingPromptCreate" type="text" name="question'+number+'_1" placeholder="Question Answer 1"><br><input class="rankingPromptCreate" type="text" name="question'+number+'_2" placeholder="Question Answer 2"><br><input class="rankingPromptCreate" type="text" name="question'+number+'_3" placeholder="Question Answer 3"><br><input class="rankingPromptCreate" type="text" name="question'+number+'_4" placeholder="Question Answer 4"><br></div></div><br>';
    }
}

function writeToScreen(text) {
    output = document.getElementById("questionDiv");
    var pre = document.createElement("p");
	pre.style.wordWrap = "break-word";
	pre.innerHTML = text;
    output.appendChild(pre);
    showDeleteButton()
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
function addMultipleChoiceAnswer(answerDIV, number) {
    var pre = document.createElement("div");
    pre.innerHTML = '<input class="multipleChoice" type="radio" name="question'+number+'" placeholder="option'+answerDIV.children.length+'"><input class="questionPromptCreate" type="text" name="question'+number+'Text'+answerDIV.children.length+'" placeholder="Question Answer"><br>';
    answerDIV.appendChild(pre)
}

function delMultipleChoiceAnswer(answerDIV) {
    console.log(answerDIV.removeChild(answerDIV.lastChild));
}

function submit(){
    for(question of test){
        var prompt = document.getElementsByName("question"+question["number"]+"Prompt")[0].value;
        question['prompt'] = prompt;
        if (question["questionType"] === "trueFalse"){
           
        }
        if (question["questionType"] === "multipleChoice"){

        }
        if (question["questionType"] === "shortAnswer"){
       
        }
        if (question["questionType"] === "essayAnswer"){
        
        } 
        if (question["questionType"] === "matching"){

        }
        if (question["questionType"] === "ranking"){
           
        }
    }
    console.log(test)
    //window.location.href ='myTests.html';
}

function changeType(type) {
    if (type == 'test' && formType != 'test') {
        formType = type;
        test = document.getElementById("testTypeButton").classList.add("typeSelected");
        document.getElementById("surveyTypeButton").classList.remove("typeSelected");
        //test form code here
    }
    else if (type == 'survey' && formType != 'survey') {
        formType = type;
        document.getElementById("surveyTypeButton").classList.add("typeSelected");
        document.getElementById("testTypeButton").classList.remove("typeSelected");
        //survey form code here
    }
}