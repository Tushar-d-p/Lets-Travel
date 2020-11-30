let Email = require("../modules/emails.js").Email;
let uniqid = require("uniqid");

let express = require("express");

let router = express.Router();

let authMiddleware = require("../middleware/auth");

// Only when the token is verified from middleware auth.js files the get request to see the emails
// data must be allowed
router.get("/", authMiddleware, async (req,resp) => {
    resp.send( await Email.find() );
});

router.post("/", async (req,resp) => {
    let reqBody = req.body;
    let newEmail = new Email({
        id: uniqid(),
        name: reqBody.name,
        message: reqBody.message,
        email: reqBody.email,
        date: new Date()
    })
    await newEmail.save();
    resp.send("Created");
});

// Only when the token is verified from middleware auth.js files the delete request to delete emails
// data must be allowed
router.delete("/:id", authMiddleware, async (req,resp) => {
    await Email.deleteOne({id: req.params.id});
    resp.send("Deleted");
})

module.exports = router;
