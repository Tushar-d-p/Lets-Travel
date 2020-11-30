async function getEmails (){

    return await fetch("http://localhost:3000/emails")
            .then( (response) => response.json() )  // the response from server is in encrypted form
            .then ( (data) => data); // encrypted form is converted into redable form
            // this returned data will be given to file main.js stored in admin->js->main.js folder
            //and it will render this into proper HTML and CSS form
}

// REMOVE Button Functionality

let emailsBlock = document.querySelector("#v-pills-mails");

emailsBlock.addEventListener("click", function(e){

    if(e.target.classList.contains("btn-remove"))
    {
        let id = e.target.parentNode.parentNode.querySelector(".id").value;

        fetch("http://localhost:3000/emails/" + id, {
            method: "DELETE"
        }).then( (response) => response.text() )
          .then( () => window.history.go());
    }
})