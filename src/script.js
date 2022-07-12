let addAnswersBtn = document.getElementById('addAnswersBtn')
let answerList = document.querySelector('.answerList')
let answerDiv = document.querySelectorAll('.answerDiv')[0]

addAnswersBtn.addEventListener('click', function(){
  let newAnswers = answerDiv.cloneNode(true)
  let input = newAnswers.getElementsByTagName('input')[0]
  input.value = ''
  answerList.appendChild(newAnswers)
})