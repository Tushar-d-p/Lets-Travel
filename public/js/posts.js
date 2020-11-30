// This file will have all the client side functions that will request for posts from the server

// fetch function is async function but getposts function is normal function so it is not async
// so it will execute immediately and will not wait for fetch function to return the response
// so to make it wait for fetch function response we use async await

async function getPosts (){

    return await fetch("http://localhost:3000/posts")
            .then( (response) => response.json() )  // the response from server is in encrypted form
            .then ( (data) => data); // encrypted form is converted into redable form
            // this returned data will be given to file main.js stored in public/js folder
            //and it will render this into proper HTML and CSS form
}

// when admin page is getting loaded this function must fire and send the requests to the server
// after this the app.get function will fire inside the server this app.get function we have 
// written in ServerSideScript.js file that app.get() function must request posts from Database 
// Database will return the array of posts to server the server will use resp.send() function
// written inside app.get() and will send the reponse to the client
// The client's .then function will catch the reponse and will the ----- file will render the
// posts information on admin page

// Now we must link this file to admin page so that when admin page is loading the getposts()
// function must fire so we link this file in --index.html-- file stored in admin Folder