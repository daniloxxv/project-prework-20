const submitQuiz3 = document.getElementById('submitQuiz3');


submitQuiz3.addEventListener('click', e =>{
  let allowSubmit = false;
  let radio = document.getElementById('formQuiz3').optionsRadios;
  let quiz3Answer;
  for(var i = 0; i < radio.length; i++) {
    if (radio[i].checked) quiz3Answer = radio[i].value;
  }
  console.log(quiz3Answer)
  if (!quiz3Answer) quiz3helper.innerHTML = "<span class = 'error'>Please select one of the above options.</span>";
  if (quiz3Answer === "option1") quiz3helper.innerHTML = "<span class = 'error'>That's what HTML is for. Please review the previous lesson.</span>";
  if (quiz3Answer === "option3") quiz3helper.innerHTML = "<span class = 'error'>That's what JavaScript is for. We'll cover that in the next lesson.</span>";
  if (quiz3Answer === "option2"){
    quiz3helper.innerHTML = "<span class = 'alert-success'>Congratulations. You have completed this lesson.</span>";
    allowSubmit = true;
  }
  if (!allowSubmit){
    e.preventDefault();
  }
});
