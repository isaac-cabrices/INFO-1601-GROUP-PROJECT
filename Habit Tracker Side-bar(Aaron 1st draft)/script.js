
//One page navigation

//Executes script for whatever page is called.
function executeScripts(){
  let script = document.querySelector('script').innerText;
  try{
    eval(script);
  }catch(oops){
    console.error(oops);
  }   
}

//Puts content from url(or html file) into the main content container
async function loadContent(title,url) {

  document.title = title;
  let content = document.querySelector('#main-content');

  if(url == null) {
    content.innerHTML = "";
  } 
  else {
    let response = await fetch(url);
    content.innerHTML = await response.text();
    executeScripts();
  }
}

//Prevents the page from shifting and sends the intentions to loadContent.
function pageShift(event){

  event.preventDefault();
  event.stopPropagation();

  let a = event.target;
  let text = a.text;
  let url = a.href;
  history.pushState({title:text, url: url}, null, a.href);
  loadContent(a.text, a.href);
}

//Identifies the nav bar and intercepts clicks on links.
const navBar = document.querySelector('#navi');
navBar.addEventListener('click', pageShift, false);

//Loads the content of the last subpage on site.
function backPage(event){

  if(event.state == null){
    loadContent(null, null);
  }
  else{
    loadContent(event.state.title, event.state.url);  
  }
}

//Executes backPage when user presses the back putton in their browser.
window.addEventListener('popstate', backPage);
