document.addEventListener("DOMContentLoaded", async function(){

    let posts = await getPosts();
    
    let articles = document.querySelector(".articles");
    articles.innerHTML = '';

    posts.forEach( (posts) => {
        let postHTML = `
        <div class="col-4">
            <div class="card">
                <img  class="card-img-top" src="${posts.imageURL}" alt="${posts.title}">
                <div class="card-body">
                    <h4 class="card-title">${posts.title}</h4>
                    <p class="card-text">${posts.description}</p>
                    <a href="/sight?id=${posts.id}" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div>`;

    articles.insertAdjacentHTML("beforeend",postHTML);
    } )
})

let CallMeForm = document.querySelector(".call-me-form");

CallMeForm.addEventListener("submit", function(e){
    e.preventDefault();

    let phoneInp = CallMeForm.querySelector("input");

    fetch("http://localhost:3000/callback-request", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            phoneNumber: phoneInp.value
        })
    }).then ( (resp) => resp.text )
    .then( () => alert("We will call you as soon as possible"));
    
})