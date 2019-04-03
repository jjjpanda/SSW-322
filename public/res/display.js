var test = [];

function displayQuestion(type, number, prompt, answers) {
    if (type == "trueFalse"){
        return '<div class="question"><span class="questionNumber">'+number+' </span><span class="questionPromptDisplay">'+prompt+'</span><div class="questionAnswers"><input class="trueFalse" type="radio" name="question'+number+'" value="option1"> True<br><input class="trueFalse" type="radio" name="question'+number+'" value="option2"> False<br></div></div><br>'
    }
    if (type == "multipleChoice"){
        output = '<div class="question"><span class="questionNumber">'+number+' </span><span class="questionPromptDisplay">'+prompt+'</span><div class="questionAnswers">'
        for (i = 0; i < answers.length; i++) {
            output += '<input class="multipleChoice" type="radio" name="question'+number+'" value="option'+i+'">'+answers[i]+'<br>'
        }
        output += '</div></div><br>'
        return output;
    }
    if (type == "shortAnswer"){
        return '<div class="question"><span class="questionNumber">'+number+' </span><span class="questionPromptDisplay">'+prompt+'</span><div class="questionAnswers"><input class="shortAnswer" type="text" name="question'+number+'"></div></div><br></br>'
    }
    if (type == "essayAnswer"){
        return '<div class="question"><span class="questionNumber">'+number+' </span><span class="questionPromptDisplay">'+prompt+'</span><div class="questionAnswers"><input class="essayAnswer" type="text" name="question'+number+'"></div></div><br>'
    } 
    if (type == "matching"){
        output = '<div class="question"><span class="questionNumber">'+number+' </span><span class="questionPromptDisplay">'+prompt+'</span><div class="questionAnswers"><table class="matchingTable"><th>Choices</th>';
        for (i = 0; i < answers.length; i++) {
            output += '<tr><td>'+(i+1)+') '+answers[i][0]+'</td></tr>';
        }
        output += '</table>';
        for (i = 0; i < answers.length; i++) {
            output += '<input class="matching" type="text" name="question'+number+'_'+(i+1)+'"> '+answers[i][1]+'<br>';
        }        
        output += '</div></div><br>';
        return output;
    }
    if (type == "ranking"){
        return '<div class="question"><span class="questionNumber">'+number+' </span><span class="questionPromptDisplay">'+prompt+'</span><div class="questionAnswers"><table class="rankingTable"><th>Choices</th><tr><td>A Answer 1</td></tr><tr><td>B Answer 2</td></tr><tr><td>C Answer 3</td></tr><tr><td>D Answer 4</td></tr></table><input class="ranking" type="text" name="question6_1"><br><input class="ranking" type="text" name="question6_2"><br><input class="ranking" type="text" name="question6_3"><br><input class="ranking" type="text" name="question6_4"><br></div></div><br>'
    }
}

function writeToScreen(text) {
    output = document.getElementById("questionDiv");
    var pre = document.createElement("p");
	pre.style.wordWrap = "break-word";
	pre.innerHTML = text;
    output.appendChild(pre);
}
