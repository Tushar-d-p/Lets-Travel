// "../" means come out of current folder i.e routes
let Post = require("../modules/posts").Post;

let uniqid = require("uniqid");

let express = require("express");

let router = express.Router(); // express contains function Router when we call that function
// it returns an object that object we assign it to router variable

let authMiddleware = require("../middleware/auth");

// WHEN CLIENT MAKE REQUEST TO THE SERVER THE SERVER MUST REQUEST THE POST INFORMATION FROM DATABASE AND
// TO MAKE REQUEST TO THE DATABASE WE MUST WRITE THIS

// 1 WE WANT TO SEE ALL THE POSTS SO WE WRITE "/posts"
// 2 THIS METHOD RETURNS ALL THE DOCUMENTS PRESENT IN THE DATABASE OF THE SPECIFIED COLLECTION.
// 3 FINDING ALL THE POSTS IN DATABASE IS ASYNC TASK SO WRITE ASYNC AWAIT   
router.get("/", async (req,resp) => {

    let posts =  await Post.find(); // THIS WILL RETURN ALL THE DOCUMENTS/ROWS FROM DATABSE COLLECTION

    resp.send(posts); // AN ARRAY WHICH CONTAINS POSTS WILL BE SEND TO THE CLIENT
})

/*on the admin page When we press the button update form we get form to update the post
 we must get updated form with prefilled information to get this information the client sends
 get request to the server with an id of post for which Edit button was clicked. The server
 reads this and queries the databse for finding information for particular id the code for this
 is written below*/

router.get("/:id", async (req,resp) => {

    let id = req.params.id;

    let post =  await Post.findOne({id: id}); // THIS WILL RETURN ALL THE DOCUMENTS/ROWS FROM DATABSE COLLECTION

    resp.send(post); // AN ARRAY WHICH CONTAINS POSTS WILL BE SEND TO THE CLIENT
})

// now when we receive a posts data from client as POST request how server will send this data to 
//database it's code is written here

router.post("/", authMiddleware, async (req,resp) => {

    let reqBody = req.body; // first take the copy the data to reBody variable

    // when file is uploaded we do the following
    let imagePath;

    if(reqBody.imageUrl)
    {
        imagePath = reqBody.imageUrl;
    }
    else {
        imagePath = req.file.path.substring(req.file.path.indexOf("/"), req.file.path.length);
        // indexof starts from the path /images/logo.png instead of public/images/logo.png
    }
    let newPost = new Post({
        //id : id++,
        id: uniqid(),
        title: reqBody.title,  
        date: new Date(), 
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        // imageURL: reqBody.imageUrl

        imageURL: imagePath
    })
    await newPost.save();
    //console.log(req.file);// The file which we sent to server is not stored in req.body but in req.file
    resp.send("Created");
})

router.delete("/:id",authMiddleware,  async (req,resp) => {
    let id = req.params.id;
    await Post.deleteOne({id: id});
    resp.send("Deleted");
})

router.put("/:id", authMiddleware, async (req,resp) => {
    let id = req.params.id;

    await Post.updateOne({id: id}, req.body);

    resp.send("Updated");
})

module.exports = router;