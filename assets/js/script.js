var questionsEl = document.querySelector("#questions");
var startEl = document.querySelector("#start");
var op1 = document.querySelector("#op1");
var op2 = document.querySelector("#op2");
var op3 = document.querySelector("#op3");
var op4 = document.querySelector("#op4");
var question = document.querySelector('#question')


var question1 = {
    quest: 'what color is the sky',
    opOne:'blue',
    opTwo:'purple',
    opThree:'green',
    opFour:'red'
}
var questionsSets = [question1,];



startEl.addEventListener('click',function(event){
    var element = event.target;

    if(!element.matches('button'))return;
    startEl.style.display="none";
    questionsEl.style.display="flex";
    setQuestion()
});

function setQuestion(){
    question.textContent = questionsSets[0].quest
    op1.textContent = questionsSets[0].opOne
    op1.textContent = questionsSets[0].opOne
    op2.textContent = questionsSets[0].opTwo
    op3.textContent = questionsSets[0].opThree
    op4.textContent = questionsSets[0].opFour
    


}






























