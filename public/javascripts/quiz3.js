let submitQuiz3 = document.getElementById("submitQuiz3");
submitQuiz3.addEventListener('click', e => {
  let allowSubmit = false;
  let quiz3answer = document.forms[0][0].value;
  let quiz3helper = document.getElementById("quiz2helper");
  if(!quiz3answer){
    quiz3helper.innerHTML = "<span class = 'error'>Please choose one of the three alternatives</span>";
  }
  else {
    console.log(document.forms[0][0])

  }
  if (!allowSubmit){
    e.preventDefault();
  }
 })