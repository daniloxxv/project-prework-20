
let submitQuiz1 = document.getElementById("submitquiz1");
submitQuiz1.addEventListener('click', e => {
  let quiz1answer = document.forms[0][0].value;
  let quiz1helper = document.getElementById("quiz1helper");
  if(!quiz1answer){
    quiz1helper.innerHTML = "The URL field cannot be blank.";
  }
  else if (!/^https?\:\/\/github\.com\/\w+\//.test(quiz1answer)){
    quiz1helper.innerHTML = "Please enter a valid GitHub URL";
  }
  else {
    quiz1helper.innerHTML = "";
  }
  e.preventDefault();
 })
