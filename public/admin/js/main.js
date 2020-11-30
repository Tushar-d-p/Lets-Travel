// The js folder inside admin contains all the JS files which will run on admin page
// Now how we will know that when admin page is loading the getpost() function must be called, for this
// there is an event DOMContentLoaded inside document object 
// so when webpage gets loaded this event gets fired we cathc that event

// So the sequence of events happens this way [function](Inside which file and folder it is stored)
// When user is on homepage he clicks the Admin Tab the Admin page is loading Now

// admin Folder -> js Folder -> index.html ->[eventlistener()](admin Folder -> js Folder -> main.js) ->
// [getPosts()](js Folder -> posts.js) ->[app.get()](ServerSideScript.js)

// RETURN
// [resp.send()](ServerSideScript.js) -> [return .then() inside getpost()](Public->js->posts.js Folder)
// -> [eventListener()](public->admin->js Folder main.js File)

document.addEventListener("DOMContentLoaded", async function(){

    /*let posts = await getPosts();
    
    let articles = document.querySelector(".articles");
    articles.innerHTML = '';

    let i = 1;

    posts.forEach( (posts) => {
        let postHTML = `
        <article class="d-flex justify-content-between align-items-center article-inline">
        
            <div class="num w5">${i++}</div>
            <input class="id" type="hidden" value="${posts.id}">
            <div class="name w30">${posts.title}</div>
            <div class="date w30">${posts.date}</div>
            <div class="country w20">${posts.country}</div>
            <div class="edit w10"><button class="btn btn-link btn-edit">Edit</button></div>
            <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
    </article>`;

    articles.insertAdjacentHTML("beforeend",postHTML);
    } )*/

    addPost();
    addCallbackRequest();
    addEmails();
})

let addPostBtn = document.querySelector(".create-post-btn");

addPostBtn.addEventListener("click", function(){
    let articlesTab = document.getElementById("v-pills-articles");
    articlesTab.classList.remove("show");
    articlesTab.classList.remove("active");

    let createPostTab = document.getElementById("v-pills-create-post");
    createPostTab.classList.add("show");
    createPostTab.classList.add("active");
})


//Function for displaying the posts on admin page
async function addPost(){
    let posts = await getPosts(); // function is stored in public -> js -> posts.js
    
    let articles = document.querySelector(".articles");
    articles.innerHTML = '';

    let i = 1;

    posts.forEach( (posts) => {
        let postHTML = `
        <article class="d-flex justify-content-between align-items-center article-inline">
        
            <div class="num w5">${i++}</div>
            <input class="id" type="hidden" value="${posts.id}">
            <div class="name w30">${posts.title}</div>
            <div class="date w30">${posts.date}</div>
            <div class="country w20">${posts.country}</div>
            <div class="edit w10"><button class="btn btn-link btn-edit">Edit</button></div>
            <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
    </article>`;

    articles.insertAdjacentHTML("beforeend",postHTML);
    } )
}


// Function for displaying the callback request on admin page
async function addCallbackRequest(){
    let requests = await getCallbackRequest(); // function is stored in admin->js->callback-request.js
    // the data send from getCallbackRequest() is stored in requests folder

    let requestBlock = document.querySelector("#v-pills-callback"); 
// v-pills-callback inside this div the callback data will be rendered on index.html of admin page

    requestBlock.innerHTML = '';

    let i = 1;

    requests.forEach( (request) => {
        let requestHTML = `
        <article class="d-flex justify-content-between align-items-center article-inline">
        
            <div class="num w5">${i++}</div>
            <input class="id" type="hidden" value="${request.id}">
            <div class="name w60">${request.phoneNumber}</div>
            <div class="date w30">${request.date}</div>
            
            
            <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
    </article>`;

    requestBlock.insertAdjacentHTML("beforeend",requestHTML);
    } )
}

// Function for displaying MAILS on admin page
async function addEmails(){
    let requests = await getEmails(); // function is stored in admin->js->callback-request.js
    // the data send from getCallbackRequest() is stored in requests folder

    let emailBlock = document.querySelector("#v-pills-mails"); 
// v-pills-callback inside this div the callback data will be rendered on index.html of admin page

    emailBlock.innerHTML = '';

    let i = 1;

    requests.forEach( (request) => {
        let requestHTML = `
        <article class="d-flex justify-content-between align-items-center article-inline">
        
            <div class="num w5">${i++}</div>
            <input class="id" type="hidden" value="${request.id}">
            <div class="name w30">${request.name}</div>
            <div class="name w30">${request.email}</div>
            <div class="date w30">${request.date}</div>
            <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
            <div class="name w100">${request.message}</div>
    </article>`;

    emailBlock.insertAdjacentHTML("beforeend",requestHTML);
    } )
}

let logOutBtn = document.querySelector(".log-out-btn");

logOutBtn.addEventListener("click", function(){
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

    window.location.href = "/"; // redirecting the user to home page
})