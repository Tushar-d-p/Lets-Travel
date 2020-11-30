// When create post button is pressed the browser must take all the information from the fields
// convert it into JSON object and make POST request to server i.e send to server
// server further will sent to the database to add it to the database

// so we identify the form first
let createPost = document.querySelector(".create-post");

let createTitle = document.querySelector("#create-title");
let createCountry = document.querySelector("#create-country");
let createImageUrl = document.querySelector("#create-imageURL");
let createText = document.querySelector("#create-text");
let createImageFile = document.querySelector("#create-image-file");

// then when button is pressed following things should happen
createPost.addEventListener("submit", function(event){

    event.preventDefault(); //since browser has its own default handler we prevent it from working

    let text = createText.value;

    // when we want to send a file by uploading it the file is binary data and we cannot send
    // binary data in JSON format that's why we didn't used file upload option in JSON.stringify
    // below to send binary data we have to use FormData() format if we use this then we will
    // not require headers and JSON.string() below so we commented it

    let data = new FormData(); //by writing this we create object named data of type FormData()

    data.append("title",createTitle.value);
    data.append("country",createCountry.value);
    data.append("imageUrl",createImageUrl.value);
    data.append("text",text);
    data.append("description",text.substring(0, text.indexOf(".")+1));
    data.append("ImageFile",createImageFile.files[0]);
    // when we upload a file it is stored in files property and this files property conatins
    // array of files now here we uploaded only single file so we do files[0]

    // A POST request is made to the server and the data is send to server
    // from here we go to ServerSideScript.js where server will make request to database
    fetch("http://localhost:3000/posts", {
        method: "POST",
        // headers: {
        //     "Content-Type":"application/json"
        // },
        // body: JSON.stringify({
        //     title: createTitle.value,
        //     country: createCountry.value,
        //     imageUrl: createImageUrl.value,
        //     text: text,
        //     description: text.substring(0, text.indexOf(".")+1)
        // })

        body: data // data object which is declared above it has all the binary data now
    // This binary data which is sent will be read on server so from here we go to ServerSideScript.js
    }).then( (response) => response.text() )
      .then( (data) => window.history.go() );


})

function disbaleInput(Input1, Input2)
{
    if(Input1.value)
    {
        Input2.disabled = true;
    }
    else {
        Input2.disabled = false;
    }
}

createImageUrl.addEventListener("change", function(){
    disbaleInput(this,createImageFile)
});

createImageFile.addEventListener("change", function(){
    disbaleInput(this,createImageUrl)
});
