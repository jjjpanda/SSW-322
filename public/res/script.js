//TODO: Add number of desired answers to addQuestion method
var test = [];
var questionNumber = 1
var formType = 'test'
function addQuestion(type, number) {
    if (type == "trueFalse"){
        test.add({'questionType':'trueFalse', 'number':number});
        return '<div class="question">\n<span class="questionNumber">'+number+'</span>\n<input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt">\n<div class="questionAnswers">\n<input class="trueFalse" type="radio" name="question'+number+'" placeholder="option1"> True<br>\n<input class="trueFalse" type="radio" name="question'+number+'" placeholder="option2"> False<br>\n</div>\n</div>\n<br></br>';
    }
    if (type == "multipleChoice"){
        test.add({'questionType':'multipleChoice', 'number':number});
        return '<div class="question">\n<span class="questionNumber">'+number+'</span>\n<input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt">\n<div class="questionAnswers">\n<input class="multipleChoice" type="radio" name="question'+number+'" placeholder="option1"> \n<input class="questionPromptCreate" type="text" name="question'+number+'Text1" placeholder="Question Answer">\n<br>\n<input class="multipleChoice" type="radio" name="question'+number+'" placeholder="option2">\n<input class="questionPromptCreate" type="text" name="question'+number+'Text2" placeholder="Question Answer">\n<br>\n<input class="multipleChoice" type="radio" name="question'+number+'" placeholder="option3">\n<input class="questionPromptCreate" type="text" name="question'+number+'Text3" placeholder="Question Answer">\n<br>\n<input class="multipleChoice" type="radio" name="question'+number+'" placeholder="option4">\n<input class="questionPromptCreate" type="text" name="question'+number+'Text4" placeholder="Question Answer">\n<br>\n</div>\n</div>\n<br></br>';
    }
    if (type == "shortAnswer"){
        test.add({'questionType':'shortAnswer', 'number':number});
        return '<div class="question">\n<span class="questionNumber">'+number+'</span>\n<input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt">\n<div class="questionAnswers">\n<input class="shortAnswer" type="text" name="question'+number+'" placeholder="Short Answer">\n</div>\n</div>\n<br></br>';
    }
    if (type == "essayAnswer"){
        test.add({'questionType':'essayAnswer', 'number':number});
        return '<div class="question">\n<span class="questionNumber">'+number+'</span>\n<input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt">\n<div class="questionAnswers">\n<input class="essayAnswer" type="text" name="question'+number+'" placeholder="Essay Answer">\n</div>\n</div>\n<br></br>';
    } 
    if (type == "matching"){
        test.add({'questionType':'matching', 'number':number});
        return '<div class="question">\n<span class="questionNumber">'+number+'</span>\n<input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt">\n<div class="questionAnswers">\n<input class="matchningPromptCreate" type="text" name="question'+number+'_1_1" placeholder="Question Prompt">=\n<input class="matchningPromptCreate" type="text" name="question'+number+'_1_2" placeholder="Question Answer">\n<br>\n<input class="matchningPromptCreate" type="text" name="question'+number+'_2_1" placeholder="Question Prompt">=\n<input class="matchningPromptCreate" type="text" name="question'+number+'_2_2" placeholder="Question Answer">\n<br>\n<input class="matchningPromptCreate" type="text" name="question'+number+'_3_1" placeholder="Question Prompt">=\n<input class="matchningPromptCreate" type="text" name="question'+number+'_3_2" placeholder="Question Answer">\n<br>\n<input class="matchningPromptCreate" type="text" name="question'+number+'_4_1" placeholder="Question Prompt">=\n<input class="matchningPromptCreate" type="text" name="question'+number+'_4_2" placeholder="Question Answer">\n</div>\n</div>\n<br></br>';
    }
    if (type == "ranking"){
        test.add({'questionType':'ranking', 'number':number});
        return '<div class="question">\n<span class="questionNumber">'+number+'</span>\n<input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt">\n<br>\n<div class="questionAnswers">\n<input class="rankingPromptCreate" type="text" name="question'+number+'_1" placeholder="Question Answer 1"><br>\n<input class="rankingPromptCreate" type="text" name="question'+number+'_2" placeholder="Question Answer 2"><br>\n<input class="rankingPromptCreate" type="text" name="question'+number+'_3" placeholder="Question Answer 3"><br>\n<input class="rankingPromptCreate" type="text" name="question'+number+'_4" placeholder="Question Answer 4"><br>\n</div>\n</div>\n<br>';
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
    if (questionNumber == 1)
        hideDeleteButton()
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