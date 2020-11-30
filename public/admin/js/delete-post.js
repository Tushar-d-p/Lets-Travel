// This queryselector select tag articles from index.html of admin page. why we select only articles
// tag because the post info which is shown on admin page are generated dynamically from database
// they are not hard core written on index.html page of admin because of this we cannot attach
// event listener to this X button so for this we have w to use event delegation

let articleBlock = document.querySelector(".articles");

articleBlock.addEventListener("click", function(e){

    if(e.target.classList.contains("btn-remove"))
    {
        let id = e.target.parentNode.parentNode.querySelector(".id").value;

        fetch("http://localhost:3000/posts/" + id, {
            method: "DELETE"
        }).then( (response) => response.text() )
          .then( () => window.history.go());
    }
})