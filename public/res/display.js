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

console.log(displayQuestion('trueFalse', 1, "test1"))
console.log(displayQuestion('multipleChoice', 2, "test2", ["answer1", "answer2", "answer3", "answer4", "answer5", "answer6", "answer7"]))
console.log(displayQuestion('shortAnswer', 3, "test3"))
console.log(displayQuestion('essayAnswer', 4, "test4"))
console.log(displayQuestion('matching', 5, "test5", [["prompt 1", "answer 1"], ["prompt 2", "answer 2"]]))
console.log(displayQuestion('ranking', 6, "test6"))
