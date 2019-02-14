const submitQuiz5 = document.getElementById('submitQuiz5');


submitQuiz5.addEventListener('click', e =>{
  let allowSubmit = false;
  let questions = document.getElementById('formQuiz5');
  let results = {};
  for (var key in questions){
    if (/^[0-5]$/.test(key)) results[key] = questions[key].value;
  }
  
  if (results[0] !== "undefined") quiz5helper.innerHTML = "<span class = 'error'>Your answer to question #1 is incorrect. Since no value was assigned to the variable <em>a</em>, its data type is <em>undefined</em></span>";
  else if (results[1] !== "object") quiz5helper.innerHTML = "<span class = 'error'>Your answer to question #2 is incorrect. {foo:'bar'} is a JavaScript object with a property 'foo', which has the value 'bar'</span>";
  else if (results[2] !== "string") quiz5helper.innerHTML = "<span class = 'error'>#3 was a trick question! 100 is a number, but the <em>typeof</em> operator will return 'number'... which is a string!</span>";
  else if (results[3] !== "boolean") quiz5helper.innerHTML = "<span class = 'error'>Your answer to question #4 is incorrect. 10 >= 9 will output the boolean value <em>true</em></span>";
  else if (results[4] !== "number") quiz5helper.innerHTML = "<span class = 'error'>The trick to question #5 is that there's no trick. Yes, '100' is a string, but the <em>parseInt()</em> method will convert it to a number</span>";
  else if (results[5] !== "array") quiz5helper.innerHTML = "<span class = 'error'>Your answer to question #6 is incorrect. 'Hello' is a string, but the <em>split()</em> method will break it into an array</span>";
  else {
      quiz5helper.innerHTML = "<span class = 'alert-success'>Congratulations. You have completed this lesson.</span>";
      allowSubmit = true;
    }

  if (!allowSubmit) e.preventDefault();

});
