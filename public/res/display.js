var test;

window.onload = function() {
  console.log("pepe is a meme")
    testname = localStorage.getItem("demo")
    test = JSON.parse(localStorage.getItem(testname))
    document.getElementById("testTitle").innerText=testname
    console.log(test)
    displayTest(test);
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
        if (answer)
            output += 'checked'
        output +='> True<br>'
        output += '<input class="trueFalse" type="radio" name="question'+number+'" value="option2"'
        if (!answer)
            output += 'checked'
        output += '> False<br></div></div><br>'
        return output
    }
    if (type == "multipleChoice"){
        output = '<div class="question"><span class="questionNumber">'+number+' </span><span class="questionPromptDisplay">'+prompt+'</span><div class="questionAnswers">'
        for (i = 0; i < answers.length; i++) {
            output += '<input class="multipleChoice" type="radio" name="question'+number+'" value="option'+i+'"'
            if (answer === i)
                output += 'checked'
            output += '>'+answers[i]+'<br>'
        }
        output += '</div></div><br>'
        return output;
    }
    if (type == "shortAnswer"){
        return '<div class="question"><span class="questionNumber">'+number+' </span><span class="questionPromptDisplay">'+prompt+'</span><div class="questionAnswers"><input class="shortAnswer" type="text" name="question'+number+'" value="'+answer+'"></div></div><br></br>'
    }
    if (type == "essayAnswer"){
        return '<div class="question"><span class="questionNumber">'+number+' </span><span class="questionPromptDisplay">'+prompt+'</span><div class="questionAnswers"><input class="essayAnswer" type="text" name="question'+number+'" value="'+answer+'"></div></div><br>'
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
            output += '<input class="matching" type="text" name="question'+number+'_'+(i+1)+'" value="'+answer[i].prompt+'"> = '+answer[i].answer+'<br>';
        }
        output += '</div></div><br>';
        return output;
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
            output += (i+1)+') <input class="ranking" type="text" name="question'+number+'_'+(i+1)+'" value="'+answer[i]+'"><br>'
        }
        output += '</div></div><br>';
        return output;
    }
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
