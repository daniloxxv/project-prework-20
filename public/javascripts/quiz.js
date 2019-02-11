//quiz 1 validation


let submitQuiz1 = document.getElementById("submitquiz1");
submitQuiz1.addEventListener('click', e => {
  let allowSubmit = false;
  let quiz1answer = document.forms[0][0].value;
  let quiz1helper = document.getElementById("quiz1helper");
  if(!quiz1answer){
    quiz1helper.innerHTML = "<span class = 'error'>The URL field cannot be blank.</span>";
  }
  else if (!/^https?\:\/\/github\.com\/\w+\//.test(quiz1answer)){
    quiz1helper.innerHTML = "<span class = 'error'>Please enter a valid GitHub URL</span>";
  }
  else {
    quiz1helper.innerHTML = "<span class = 'alert-success'>You have completed the lesson</span>";
    allowSubmit = true;

  }
  if (!allowSubmit){
    e.preventDefault();
  }
})

  let submitQuiz2 = document.getElementById("submitQuiz2");
submitQuiz2.addEventListener('click', e => {
  let allowSubmit = false;
  let quiz2answer = document.forms[0][0].value;
  let quiz2helper = document.getElementById("quiz2helper");
  if(!quiz2answer){
    quiz2helper.innerHTML = "<span class = 'error'>The URL field cannot be blank.</span>";
  }
  else if (/^ *\<[Pp]\>\s*Ironhack rocks\!\s*\<\/[Pp]\> *$/.test(quiz2answer)){
    quiz2helper.innerHTML = "<span class = 'success'>You have successfully completed the exercise.</span>";
    allowSubmit = true;
  }
  else if (/\< *[Pp] *\>/.test(quiz2answer)){
    quiz2helper.innerHTML = "<span class = 'error'>Be careful: there shouldn't be spaces inside your HTML tags.</span>";
  }
  else {
    quiz2helper.innerHTML = "<span class = 'error'>Your answer is incorrect. Please review the lesson and the quiz instructions.</span>";
  }
  if (!allowSubmit){
    e.preventDefault();
  }
 })