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
    quest: 'Which word is used to define a variable?',
    opOne:'function',
    an1:'wrong',
    opTwo:'var',
    an2:'correct',
    opThree:'event',
    an3:'wrong',
    opFour:'object',
    an4:'wrong'
}
var question2 = {
    quest: 'What does the debugger statement do?',
    opOne:'Creates a break point in the program.',
    an1:'correct',
    opTwo:'It will debug error in the statement.',
    an2:'wrong',
    opThree:'It will debug all the errors in the the program.',
    an3:'wrong',
    opFour:'All of the above',
    an4:'wrong'
}
var question3 = {
    quest: 'Which function is used to turn an object into a JSON string',
    opOne:'parse',
    an1:'wrong',
    opTwo:'convert',
    an2:'wrong',
    opThree:'stringify',
    an3:'correct',
    opFour:'none of the above',
    an4:'wrong'
}
var question4 = {
    quest: 'emty',
    opOne:'empty',
    an1:'empty',
    opTwo:'convert',
    an2:'wrong',
    opThree:'stringify',
    an3:'correct',
    opFour:'none of the above',
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
function setQuestion(){
    if(i > questionsSets.length - 1){
        scorePage()
        i++
        return
    }
    // console.log(i)
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


//-----
function scorePage(){
    questionsEl.style.display="none"
    highScoreEl.style.display="flex";

}


//-----
function timer(){
    var timeLeft = questionsSets.length*10 +5 ;

    
 
    var timeInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent ='Time:'+ timeLeft;
        if (timeLeft <= 0){
            clearInterval(timeInterval)
            scorePage()
            timerEl.textContent ='Time: 0';
            scores.push(timeLeft)
        }
        console.log(i)
        if (i > questionsSets.length){
            clearInterval(timeInterval)
            scores.push(timeLeft)
        }
    },1000);

    questionsEl.addEventListener('click',function(event){
        var element = event.target;
    
        if(!element.matches('button'))return
        var state = element.getAttribute('data-state')
        console.log(state)
        if(state === 'correct'){
            result.textContent = state
            setQuestion()
            return
        }
        if(state === 'wrong'){
            result.textContent = state
            timeLeft = timeLeft - 10
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
        li.setAttribute('style','padding:5px')
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

    storeScores()
    renScores()
})

init()



















