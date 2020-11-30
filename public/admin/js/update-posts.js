// when we click the Edit button we must get a form to update the post must pop up this is 
// same as when we click the X button the post gets deleted

// This queryselector select tag articles from index.html of admin page. why we select only articles
// tag because the post info which is shown on admin page are generated dynamically from database
// they are not hard core written on index.html page of admin because of this we cannot attach
// event listener to this "Edit" button so for this we have we to use event delegation
{
    let articleBlock = document.querySelector(".articles");

    let updateForm = document.querySelector(".update-post-form");

    let titleInp = document.querySelector("#update-title");

    let textInp = document.querySelector("#update-text");

    let updateImageUrl = document.querySelector("#update-imageURL");

    let id;

    articleBlock.addEventListener("click", async function(e){

    // so when the button is clicked the update form must get active

        if(e.target.classList.contains("btn-edit"))
        {
            // to get the update form pre-filled first we must get this data
            id = e.target.parentNode.parentNode.querySelector(".id").value;

            let postInfo = await fetch("http://localhost:3000/posts/" + id)
                                 .then( (resp) => resp.json())
                                 .then( (data) => data)

           
            titleInp.value = postInfo.title;

            textInp.value = postInfo.text;

            let articlesTab = document.getElementById("v-pills-articles");
            articlesTab.classList.remove("show");
            articlesTab.classList.remove("active");
        
            let updatePostTab = document.getElementById("v-pills-update-post");
            updatePostTab.classList.add("show");
            updatePostTab.classList.add("active");
            
        }
    })

    updateForm.addEventListener("submit", function(e){
        e.preventDefault();

        fetch("http://localhost:3000/posts/" +id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: titleInp.value,
                text: textInp.value,
                description: textInp.value.substring(0, textInp.value.indexOf(".")+1),
                imageURL: updateImageUrl.value
            })
        }).then( (resp) => resp.text())
          .then( () => window.history.go());
        
    })
}