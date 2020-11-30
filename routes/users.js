let User = require("../modules/users").User;

let express = require("express");

let router = express.Router();

let bcrypt = require("bcrypt"); // bcrypt is used to encrypt the password so we install this pkg

let auth = require("../controllers/auth");

// When LOGIN request is made we have to just find
router.post("/login", async (req,resp) => {
  let email = req.body.email;

  let password = req.body.password;

// Find whether user email and password matches from database
  let user = await User.find().where({email: email});

  console.log(user);
// This user is an array but it conatins one single element because while searching to specific
// user we used "where" for email so only that matching email user will be returned which obviously
// will be 1

  if(user.length > 0)
  {
      let comparisonResult = await bcrypt.compare(password, user[0].password);

      if(comparisonResult)
      {
          let token = auth.generateToken(user[0]);

          resp.cookie("auth_token",token);
          //resp.send(token);
        //   resp.send("Logged In");

        // Now instead of sending Logged In message to user we will modify the code little bit so when
        // user is Logged In he is automatically redirected to admin page
        resp.send({
            redirectURL: "/admin"
        });
      }
      else 
      {
          resp.status(400);
          resp.send("Rejected");
      }    
  }
  else 
  {
      resp.status(400);
      resp.send("Rejected"); // If there is no matching email then 0 user array will contain 0 elem
  }
})

// When REGISTER request is made we have to check whether email id already exist
router.post("/register", async (req,resp) => {
    let email = req.body.email;

    let password = req.body.password;

    let user = await User.find().where({email: email}); // if this is blank means false

    if(user.length === 0)
    {
        // brcypt is function which has another function hash which takes 2 arg the string to
        // be encrypted and the level of encryption

        let encryptedPass = await bcrypt.hash(password, 12);

        // create new user
        let newUser = new User({
            email: email,
            password: encryptedPass
        })
        await newUser.save();
        resp.send("Done");
    }
    else {
        resp.send("Rejected");
    }
})

module.exports = router;