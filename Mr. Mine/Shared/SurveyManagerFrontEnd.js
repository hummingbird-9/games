class SurveyAnswer {
    id;
    answerTextValue;

    constructor(id, answerTextValue)
    {
        this.id = id;
        this.answerTextValue = answerTextValue;
    }
}

class SurveyQuestion {
    id;
    questionText;
    answers;
    isSkipped;
    isRandomized = false;

    savedAnswer;
    startTime;
    endTime;
    totalTime;

    constructor(id, questionText)
    {
        this.id = id;
        this.answers = [];
        this.questionText = questionText;
        this.isSkipped = function(){ return false; }
    }

    appendAnswer(answer)
    {
        this.answers.push(answer);
    }

    render()
    {
        //override
    }

    getCurrentValue()
    {
        //override
    }

    canMoveToNextQuestion()
    {
        return true;
    }

    start()
    {
        this.startTime = performance.now();
    }

    logAnswer()
    {
        this.savedAnswer = this.getCurrentValue();
        this.endTime = performance.now();
        this.totalTime = Math.round(this.endTime - this.startTime);
    }

    shuffleAnswers()
    {
        let currentIndex = this.answers.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [this.answers[currentIndex], this.answers[randomIndex]] = [
            this.answers[randomIndex], this.answers[currentIndex]];
        }
      }
}

class TextEntryQuestion extends SurveyQuestion
{
    render(div)
    {
        if(document.getElementById("questionEntry") == null)
        {
            var htmlToAdd = "<div id='questionEntry'><form class='row' onsubmit='event.preventDefault(); surveyManager.onSubmitQuestionAnswer();'><h1>"+this.questionText+"</h1>";
            htmlToAdd += "<div class='col-12'><input type='text' id='answer' class='form-control'></input></div><div class='col-12' style='text-align: center;'><input type='submit' value='Next Question' class='btn btn-primary'></div></form></div>";
            document.getElementById(div).innerHTML += htmlToAdd;
        }
    }

    getCurrentValue()
    {
        return document.getElementById("answer").value;
    }
}

class MultipleChoiceQuestion extends SurveyQuestion
{
    render(div)
    {
        if(document.getElementById("questionEntry") == null)
        {
            var answerValues = "";
            if(this.isRandomized)
            {
                this.shuffleAnswers();
            }

            for(var i=0; i<this.answers.length; i++)
            {
                answerValues += "<label for='a"+i+"' style='cursor: pointer;'><input id='a"+i+"' type='radio' name='multipleChoice' value='"+this.answers[i].id+"'> "+this.answers[i].answerTextValue+"</label><br>";
            }

            var htmlToAdd = "<div id='questionEntry'><form class='row' onsubmit='event.preventDefault(); surveyManager.onSubmitQuestionAnswer();'><h1>"+this.questionText+"</h1>";
            htmlToAdd += "<div class='col-12'>"+answerValues+"</div><div class='col-12' style='text-align: center;'><input type='submit' value='Next Question' class='btn btn-primary'></div></form></div>";
            document.getElementById(div).innerHTML += htmlToAdd;
        }
    }

    getCurrentValue()
    {
        return document.querySelector('input[name="multipleChoice"]:checked').value;
    }
}

class MultipleCheckboxQuestion extends SurveyQuestion
{
    render(div)
    {
        if(document.getElementById("questionEntry") == null)
        {
            var answerValues = "";
            if(this.isRandomized)
            {
                this.shuffleAnswers();
            }
            for(var i=0; i<this.answers.length; i++)
            {
                answerValues += "<label for='a"+i+"' style='cursor: pointer;'><input id='a"+i+"' type='checkbox' name='multipleCheckboxChoice' value='"+this.answers[i].id+"'> "+this.answers[i].answerTextValue+"</label><br>";
            }

            var htmlToAdd = "<div id='questionEntry'><form class='row' onsubmit='event.preventDefault(); surveyManager.onSubmitQuestionAnswer();'><h1>"+this.questionText+"</h1>";
            htmlToAdd += "<div class='col-12'>"+answerValues+"</div><div class='col-12' style='text-align: center;'><input type='submit' value='Next Question' class='btn btn-primary'></div></form></div>";
            document.getElementById(div).innerHTML += htmlToAdd;
        }
    }

    getCurrentValue()
    {
        var result = [];
        var checkedBoxes = document.querySelectorAll('input[name=multipleCheckboxChoice]:checked');
        for(var i=0; i<checkedBoxes.length; i++)
        {
            result.push(checkedBoxes[i].value);
        }
        return result.join(",");
    }
}

class HorizontalMultipleChoiceQuestion extends SurveyQuestion
{
    render(div)
    {
        if(document.getElementById("questionEntry") == null)
        {
            var answerValues = "";
            for(var i=0; i<this.answers.length; i++)
            {
                answerValues += "<label for='a"+i+"' style='cursor: pointer;'><input type='radio' id='a"+i+"' name='multipleChoice' class='blockRadio' value='"+this.answers[i].id+"'> "+this.answers[i].answerTextValue+"</label>&nbsp;&nbsp;";
            }

            var htmlToAdd = "<div id='questionEntry' text-align: center;><form class='row' onsubmit='event.preventDefault(); surveyManager.onSubmitQuestionAnswer();'><h1>"+this.questionText+"</h1>";
            htmlToAdd += "<div class='col-12' style='text-align: center;'>"+answerValues+"</div><br><div class='col-12' style='text-align: center;'><input type='submit' value='Next Question' class='btn btn-primary'></div></form></div>";
            document.getElementById(div).innerHTML += htmlToAdd;
        }
    }

    getCurrentValue()
    {
        return document.querySelector('input[name="multipleChoice"]:checked').value;
    }
}

class ConfirmationPromptQuestion extends SurveyQuestion
{
    confirmationText = "";

    constructor(id, questionText, confirmationText)
    {
        super(id, questionText);
        this.confirmationText = confirmationText;
    }

    render(div)
    {
        if(document.getElementById("questionEntry") == null)
        {
            var htmlToAdd = "<div id='questionEntry'><form class='row' onsubmit='event.preventDefault(); surveyManager.onSubmitQuestionAnswer();'>"+this.questionText+"<br><br>";
            htmlToAdd += "<div class='col-12' style='text-align: center;'><label for='a0' style='cursor: pointer;'><input id='a0' type='checkbox' name='checkboxConfirm'> "+this.confirmationText+"</label></div><div class='col-12' style='text-align: center;'><input type='submit' value='Start Survey' class='btn btn-primary'></div></form></div>";
            document.getElementById(div).innerHTML += htmlToAdd;
        }
    }

    getCurrentValue()
    {
        return document.querySelector('input[name="checkboxConfirm"]:checked');
    }

    canMoveToNextQuestion()
    {
        return this.getCurrentValue() != null;
    }
}

//must instantiate as "global var surveyManager"
class SurveyManager
{
    wrapperDiv;
    questions = [];
    userId;
    gameName;
    currentQuestionIndex = 0;
    onCompleteCallback;
    endpoint;
    flashEndpoint;
    logValue1;
    logValue2;
    id;
    version;

    constructor(wrapperDiv)
    {
        this.wrapperDiv = wrapperDiv;
        this.id = Math.floor(Math.random() * 2147483647);
    }

    init()
    {
        this.resetWrapperDiv();
        this.renderQuestion();
    }

    appendQuestion(question)
    {
        this.questions.push(question);
    }

    resetWrapperDiv()
    {
        if(document.getElementById(this.wrapperDiv) == null)
        {
            document.body.innerHTML += `<div id="${this.wrapperDiv}" class="container mx-auto" style="background-color: rgb(255, 255, 255); max-width: 90vw; height: 100vh; padding: 30 30 30 30;"></div>`;
        }
        document.getElementById(this.wrapperDiv).innerHTML = "";
    }

    onSubmitQuestionAnswer()
    {
        console.log(this.getCurrentQuestion().getCurrentValue());
        if(this.getCurrentQuestion().canMoveToNextQuestion())
        {
            this.getCurrentQuestion().logAnswer();
            this.uploadQuestionData();
            this.nextQuestion();
        }
    }

    uploadQuestionData()
    {
        if(this.currentQuestionIndex > 0)
        {
            localStorage["q"+this.getCurrentQuestion().id] = this.getCurrentQuestion().getCurrentValue();
            var url = this.endpoint+"?gameName="+this.gameName+"&gameUid="+this.userId+"&questionId="+this.getCurrentQuestion().id+"&answerValue="+encodeURIComponent(this.getCurrentQuestion().getCurrentValue())+"&timeToAnswer="+this.getCurrentQuestion().totalTime+"&surveyVersion="+this.version+"&surveyId="+this.id+"&logValue1="+this.logValue1+"&logValue2="+this.logValue2;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function ()
            {
                if(xhr.readyState == 4)
                {
                    if(typeof (xhr.responseText) !== "undefined")
                    {
                        //console.log(xhr.responseText);
                    }
                }
            }
            xhr.send();
        }
    }

    getPercentComplete()
    {
        var numRemainingQuestions = 0;
        for(var i=this.currentQuestionIndex; i<this.questions.length; i++)
        {
            if(!this.questions[i].isSkipped())
            {
                numRemainingQuestions++;
            }
        }
        return (this.currentQuestionIndex / (this.currentQuestionIndex + numRemainingQuestions));
    }

    getCurrentQuestion()
    {
        return this.questions[this.currentQuestionIndex];
    }

    isFinished()
    {
        return (this.currentQuestionIndex >= this.questions.length);
    }

    renderQuestion()
    {
        this.getCurrentQuestion().render(this.wrapperDiv);
        this.renderFillBar();
    }

    renderFillBar()
    {
        document.getElementById(this.wrapperDiv).innerHTML += '<div class="meter"><span style="width: '+Math.round(this.getPercentComplete()*100)+'%"></span></div>';
    }

    nextQuestion()
    {
        this.currentQuestionIndex++;
        this.resetWrapperDiv();
        if(this.isFinished())
        {
            this.onCompleteCallback();
        }
        else
        {
            if(!this.getCurrentQuestion().isSkipped())
            {
                this.getCurrentQuestion().start();
                this.renderQuestion();
            }
            else
            {
                this.nextQuestion();
            }
        }
    }

    getFlashQuestionHTML(callback)
    {
        var url = this.flashEndpoint+"?cmd=getSurveyHTMLForUnansweredLiveQuestions&gameName="+this.gameName+"&gameUid="+this.userId;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function ()
        {
            if(xhr.readyState == 4)
            {
                if(typeof (xhr.responseText) !== "undefined")
                {
                    console.log(xhr.responseText);
                    callback(xhr.responseText);
                }
            }
        }
        xhr.send();
    }
}