const submitQuiz4 = document.getElementById('submitQuiz4');


submitQuiz4.addEventListener('click', e =>{
  let allowSubmit = false;
  let boxes = document.getElementById('formQuiz4').checkboxes;
  console.log(boxes)
  let quiz4Answers = [];
  for(let i = 0; i < boxes.length; i++) {
    if (boxes[i].checked) quiz4Answers.push(boxes[i].value);
  }
  console.log(quiz4Answers)
  if (quiz4Answers.length === 0) quiz4helper.innerHTML = "<span class = 'error'>Please select one of the options.</span>";
  else if (quiz4Answers.indexOf("option1") > -1) quiz4helper.innerHTML = "<span class = 'error'>JavaScript variables names cannot start with numbers</span>";
  else if (quiz4Answers.indexOf("option3") > -1) quiz4helper.innerHTML = "<span class = 'error'>Check the documentation again: 'class' is a reserved keyword in JS</span>";
  else if (quiz4Answers.indexOf("option2") === -1) quiz4helper.innerHTML = "<span class = 'error'>Check option 2 again. Variable names can start with underscores</span>";
  else if (quiz4Answers.indexOf("option4") === -1) quiz4helper.innerHTML = "<span class = 'error'>Check option 4 again. 'foo' is a valid variable name</span>";
  else if (quiz4Answers.indexOf("option5") === -1) quiz4helper.innerHTML = "<span class = 'error'>Trick question! Since JS is case-sensitive, 'New' is allowed even though 'new' is a reserved word. Using it would be a very bad practice, though!</span>";
  else if (quiz4Answers.length === 3 && quiz4Answers.indexOf("option2") > -1 && quiz4Answers.indexOf("option4") > -1 && quiz4Answers.indexOf("option5") > -1){
    quiz4helper.innerHTML = "<span class = 'alert-success'>Congratulations. You have completed this lesson.</span>";
    allowSubmit = true;
  }

  if (!allowSubmit) e.preventDefault();

});
