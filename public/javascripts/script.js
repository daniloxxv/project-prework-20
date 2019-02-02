$(document).ready(function(){

  /////// creating breadcrumbs
const here = location.href.split('/').slice(3);
const parts = [{ "text": 'Home', "link": '/' }];
  for( let i = 0; i < here.length; i++ ) {
    let part = here[i];
    let text = part ? part[0].toUpperCase() + part.slice(1,part.length) : "";
    let link = '/' + here.slice( 0, i + 1 ).join('/');
    parts.push({ "text": text, "link": link });
  }

let breadcrumbs = $('#breadcrumblist')
for (let i = 0; i < parts.length-1; i++){
    breadcrumbs.append(`<li class="breadcrumb-item" aria-current="page"><a href="${parts[i].link}">${parts[i].text}</a></li>`)
  }

  breadcrumbs.append(`<li class="breadcrumb-item active" aria-current="page">${parts.pop().text}</li>`)
})