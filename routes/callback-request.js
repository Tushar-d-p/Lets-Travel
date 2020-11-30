let CallbackRequest = require("../modules/callback-request.js").CallbackRequest;
let uniqid = require("uniqid");

let express = require("express");

let router = express.Router();

let authMiddleware = require("../middleware/auth");

// Only when the token is verified from middleware auth.js files the get request to see the callback
// data must be allowed
router.get("/", authMiddleware, async (req,resp) => {
    resp.send( await CallbackRequest.find() );
});

// All users are allowed to make callback-request that is call-Me
router.post("/", async (req,resp) => {
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
        id: uniqid(),
        phoneNumber: reqBody.phoneNumber,
        date: new Date()
    })
    await newRequest.save();
    resp.send("Created");
});

// Only when the token is verified from middleware auth.js files the delete request to delete the
// see the callback data must be allowed
router.delete("/:id", authMiddleware, async (req,resp) => {
    await CallbackRequest.deleteOne({id: req.params.id});
    resp.send("Deleted");
});

module.exports = router;