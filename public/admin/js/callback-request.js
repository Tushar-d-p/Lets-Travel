// Why we created sepearate file for get request call and not used the same get call from 
// public -> js -> posts.js file because that posts.js file get request call will be used by both
// Home page and admin page of website to display posts but for callback it will be displayed only
// on Admin page so only admin page will use it that's why we created sepearate get request call
// for callback request 

async function getCallbackRequest (){

    return await fetch("http://localhost:3000/callback-request")
            .then( (response) => response.json() )  // the response from server is in encrypted form
            .then ( (data) => data); // encrypted form is converted into redable form
            // this returned data will be given to file main.js stored in admin->js->main.js folder
            //and it will render this into proper HTML and CSS form
}

// REMOVE button Functionality
let requestBlock = document.querySelector("#v-pills-callback");

requestBlock.addEventListener("click", function(e){

    if(e.target.classList.contains("btn-remove"))
    {
        let id = e.target.parentNode.parentNode.querySelector(".id").value;

        fetch("http://localhost:3000/callback-request/" + id, {
            method: "DELETE"
        }).then( (response) => response.text() )
          .then( () => window.history.go());
    }
})