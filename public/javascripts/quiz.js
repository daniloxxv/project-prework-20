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

