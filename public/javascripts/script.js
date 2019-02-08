$(document).ready(function(){

  /////// creating breadcrumbs
const here = location.href.split('/').slice(3);
let parts = [{ "text": 'Home', "link": '/' }];
  for( let i = 0; i < here.length; i++ ) {
    let part = here[i];
    let text = part ? part[0].toUpperCase() + part.slice(1,part.length) : "";
    let link = '/' + here.slice( 0, i + 1 ).join('/');
    part ? parts.push({ "text": text, "link": link }): part;
  }
let breadcrumbs = $('#breadcrumblist')
let error = $('#error')
console.log(parts)
parts = parts.filter(el=>el.text !== "Classmates" && el.text !== "User" && !/[0-9]/.test(el.text)); 
console.log(parts)
if (error.length === 0){
for (let i = 0; i < parts.length-1; i++){
    breadcrumbs.append(`<li class="breadcrumb-item" aria-current="page"><a href="${parts[i].link}">${parts[i].text}</a></li>`)
  }
  breadcrumbs.append(`<li class="breadcrumb-item active" aria-current="page">${parts.pop().text}</li>`)
}
else {
  breadcrumbs.append(`<li class="breadcrumb-item" aria-current="page">Error 404</li>`)
  console.log(error)
}
})