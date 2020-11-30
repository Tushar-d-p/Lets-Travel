let express = require("express");

let app = express();

let mongoose = require("mongoose");

let multer = require("multer");

let CallbackRequestRouter = require("./routes/callback-request");

let emailRouter = require("./routes/emails");

let Post = require("./modules/posts.js").Post;

let userRouter = require("./routes/users");

let cookieParser = require("cookie-parser");

let auth = require("./controllers/auth");

// 1st Argument specifies that we will be using template engine
// 2nd aArgument specifies which engine we will use
app.set("view engine", "ejs");


// "./" means in current folder i.e LETS-TRAVEL-ADVANCE
let postRouter = require("./routes/routes.js");


mongoose.connect("mongodb://localhost/travels");
app.use(express.json());

let imageStorage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, "public/images"),
    filename: (req, file, callback) => callback(null, file.originalname)
})

app.use(multer({storage:imageStorage}).single("ImageFile"));



// let id = 1; // we are not using this bcoz every time we start server it starts with id 1
// to avoid this we use uniqid package


//console.log(Post);
app.use(express.static("public"));

/*when user makes a request to /posts then the request call must be redirected to routes folder
in which routes.js file is stored in that file the get,post,update,delete call are stored 
to do this we use below line*/

app.use("/posts", postRouter);

app.use("/callback-request", CallbackRequestRouter);

app.use("/emails", emailRouter);

app.use("/users",userRouter);

app.use(cookieParser()); // This automatically generate cookies for every request

/*When the get request is made on path /sight an HTML file has to be generated based on file
sight.ejs the response is render for "sight" and object which conatins information 
what things to be render*/

app.get("/sight", async (req,resp) => {
    let id = req.query.id;

    let post = await Post.findOne({id: id});

    resp.render("sight", {
        title: post.title ,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    })
})

// let isLoggedIn = false;
app.get("/admin", (req,resp) => {

// Whatever cookie is send from user the server must verify it before showing the admin page so we do
    let token = req.cookies["auth_token"];

    if(token && auth.checkToken(token))
    {
        resp.render("admin");
    }
    else 
    {
        resp.redirect("/login"); // when the user is not logged In the redirect the user to below 
    }
   
})

app.get("/login", (Req,resp) => {

    resp.render("login");
})

app.listen(3000, () => console.log("Listening on 3000"));