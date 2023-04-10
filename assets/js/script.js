var questionsEl = document.querySelector("#questions");
var startEl = document.querySelector("#start");
var highScoreEl = document.querySelector('#highScores')
var timerEl = document.querySelector('#timer')
var op1 = document.querySelector("#op1");
var op2 = document.querySelector("#op2");
var op3 = document.querySelector("#op3");
var op4 = document.querySelector("#op4");
var question = document.querySelector('#question')
var result = document.querySelector('#result')
var scoreInput = document.querySelector("#score-text")
var scoreForm = document.querySelector('#score-form')
var scoreList = document.querySelector('#score-list')
//-----
var question1 = {
    quest: 'what color is the sky',
    opOne:'blue',
    an1:'correct',
    opTwo:'purple',
    an2:'wrong',
    opThree:'green',
    an3:'wrong',
    opFour:'red',
    an4:'wrong'
}
var question2 = {
    quest: 'what color is this guy',
    opOne:'blue',
    an1:'correct',
    opTwo:'purple',
    an2:'wrong',
    opThree:'green',
    an3:'wrong',
    opFour:'red',
    an4:'wrong'
}
var question3 = {
    quest: 'what color is that spy',
    opOne:'blue',
    an1:'correct',
    opTwo:'purple',
    an2:'wrong',
    opThree:'green',
    an3:'wrong',
    opFour:'red',
    an4:'wrong'
}
var questionsSets = [question1,question2,question3];
var scores = []
var names = []
//-----
startEl.addEventListener('click',function(event){
    var element = event.target;

    if(!element.matches('button'))return;
    startEl.style.display="none";
    questionsEl.style.display="flex";
    i=0
    setQuestion()
    timer()
});
//-----
i=0
function setQuestion(){
    if(i > questionsSets.length - 1){
        i=0
        scorePage()
    }
    console.log(i)
    question.textContent = questionsSets[i].quest
    op1.textContent = questionsSets[i].opOne
    op1.setAttribute('data-state',questionsSets[i].an1)
    op2.textContent = questionsSets[i].opTwo
    op2.setAttribute('data-state',questionsSets[i].an2)
    op3.textContent = questionsSets[i].opThree
    op3.setAttribute('data-state',questionsSets[i].an3)
    op4.textContent = questionsSets[i].opFour
    op4.setAttribute('data-state',questionsSets[i].an4)
    i++
    
}

questionsEl.addEventListener('click',function(event){
    var element = event.target;

    if(!element.matches('button'))return
    var state = element.getAttribute('data-state')
    if(state === 'correct'){
        result.textContent = state
        setQuestion()
        return
    }
})
//-----
function scorePage(){
    questionsEl.style.display="none"
    highScoreEl.style.display="flex";

}


//-----
function timer(){
    var timeLeft = questionsSets.length*10 ;

 
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent ='Time:'+ timeLeft;
        if (i > questionsSets.length - 1){
            clearInterval(timeInterval)
            scores.push(timeLeft)
        }
        if (timeLeft <= 0){
            clearInterval(timeInterval)
            scorePage()
            timerEl.textContent ='Time: 0';
            scores.push(timeLeft)
        }
        


    },1000);
    questionsEl.addEventListener('click',function(event){
        var element = event.target;
    
        if(!element.matches('button'))return
        var state = element.getAttribute('data-state')
        if(state === 'wrong'){
            timeLeft = timeLeft -10;
            result.textContent = state
            timerEl.textContent ='Time:'+ timeLeft + ' - 10';
            setQuestion()
            return
        }
        
    })
    

}

function init(){
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    var storedNames = JSON.parse(localStorage.getItem("names"));
    if(storedScores !== null){
        scores = storedScores
        names = storedNames
    }
    renScores();
}

function renScores(){
    scoreList.innerHTML = "";

    for(var i = 0; i < scores.length; i++){
        var score = scores[i];
        var name =  names[i]

        var li = document.createElement('li');
        li.textContent = name + '-' + score

        scoreList.appendChild(li);
    }
}

function storeScores(){
    localStorage.setItem("scores", JSON.stringify(scores));
    localStorage.setItem("names", JSON.stringify(names));
}


scoreForm.addEventListener('submit',function(event){
    event.preventDefault();
    var initials = scoreInput.value
    if(initials === '')return;
    names.push(scoreInput.value)
    if(names.length > scores.length ){
        names.pop()

    }
    storeScores()
    renScores()
})

highScoreEl.addEventListener('click',function(event){
    var element = event.target;
    
    if(!element.matches('button'))return
    names = []
    scores = []

    renScores()
})

init()



















