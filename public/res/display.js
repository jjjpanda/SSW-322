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
            output += '<tr><td>'+String.fromCharCode(65 + i)+') '+answers[i][0]+'</td></tr>';
        }
        output += '</table>';
        for (i = 0; i < answers.length; i++) {
            output += '<input class="matching" type="text" name="question'+number+'_'+(i+1)+'"> = '+answers[i][1]+'<br>';
        }        
        output += '</div></div><br>';
        return output;
    }
    if (type == "ranking"){
        output = '<div class="question"><span class="questionNumber">'+number+' </span><span class="questionPromptDisplay">'+prompt+'</span><div class="questionAnswers"><table class="rankingTable"><th>Choices</th>';
        for (i = 0; i < answers.length; i++) {
            output += '<tr><td>'+String.fromCharCode(65 + i)+') '+answers[i]+'</td></tr>';
        }
        output += '</table>';
        for (i = 0; i < answers.length; i++) {
            output += (i+1)+') <input class="ranking" type="text" name="question'+number+'_'+(i+1)+'"><br>'
        }
        output += '</div></div><br>';
        return output;
    }
}

function writeToScreen(text) {
    output = document.getElementById("questionDiv");
    var pre = document.createElement("p");
	pre.style.wordWrap = "break-word";
	pre.innerHTML = text;
    output.appendChild(pre);
}
