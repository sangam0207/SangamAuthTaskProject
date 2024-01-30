const express = require("express");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const { userdb } = require("../models/userSchema");
const {authenticate}=require("../middleware/Authenticate.js");
router.post("/register", async (req, res) => {
  //console.log(req.body)
  const { fname, email, password, cpassword } = req.body;
  if (!fname || !email || !password || !cpassword) {
    res.status(422).json({ error: "fill all the details" });
  }
  try {
    const preUser = await userdb.findOne({ email: email });
    if (preUser) {
      res.status(422).json({ error: "This Email is Already Exist" });
    } else if (password !== cpassword) {
      res
        .status(422)
        .json({ error: "Password and confirm Password not match" });
    } else {
      const finalUser = new userdb({
        fname: fname,
        email: email,
        password: password,
        cpassword: cpassword,
      });
      // password hashing in user schema
      const newUser = await finalUser.save();
      res.status(201).json({ status: 201, newUser });
    }
  } catch (error) {
    res.status(422).json(error);
    console.log("catch block error");
  }
});
// login Api
router.post("/login", async (req, res) => {
  // console.log(req.body)
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "fill all the details" });
  }
  try {
    const userValid = await userdb.findOne({ email: email });
    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);
      if (!isMatch) {
        res.status(422).json({ error: "Invalid details" });
      } else {
        // TOKEN GENERATE
        const token = await userValid.generateAuthToken();
        console.log(token);
        //cookie generate
        res.cookie("userCookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });
        {
          /* */
        }
        const result = {
          userValid,
          token,
        };
        res.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {
    console.log(error)
  }
});
// validUser
router.get("/validUser", authenticate, async (req, res) => {
  try {
    const validUserOne = await userdb.findOne({ _id: req.userId });
   console.log(validUserOne);
    res.status(201).json({ status: 201, validUserOne });
  } catch (error) {
    res.status(401).json({ status: 401, error :"Unauthorized - Invalid user ID"});
  }
});
router.get('/logout',authenticate,async(req,res)=>{
try {
  req.rootUser.tokens=req.rootUser.tokens.filter((current)=>{
    return(
      current.token!==req.token
    )
  });
  res.clearCookie("userCookie",{path:"/"});
  req.rootUser.save();
  res.status(201).json({status:201});
} catch (error) {
  res.status(401).json({status:401,error});
} 
})
 // CRUD USER //

 router.post('/user/task/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const validUserOne = await userdb.findById(id);
    console.log('validUserOne data is ', validUserOne);

    const { description } = req.body;
    console.log(description);

    validUserOne.tasks.push({ description });

    console.log(req.body);
    await validUserOne.save();

    res.status(201).json({ tasks: validUserOne.tasks });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/user/tasks/:id', async (req, res) => {
  try {
    const {id}=req.params;
    const validUserOne = await userdb.findById({id});

    if (!validUserOne) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ tasks: validUserOne.tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// update tha task of a User
router.patch('/updateTask/:userId/:taskId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
   const {description}=req.body;
    const user = await userdb.findById(userId);

    if (!user) {
      return res.status(404).send({ error: 'User not found!' });
    }

    let taskToUpdate = user.tasks.find((item) => item._id == taskId);
      
    if (!taskToUpdate) {
      return res.status(404).send({ error: 'Task not found!' });
    }
   taskToUpdate.description=description;
 

    // console.log(user);
    await user.save(); 

    res.status(200).send(user.tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


// Delete a task for a user

router.delete('/deleteTask/:userId/:taskId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskId = req.params.taskId;

    const user = await userdb.findById(userId);

    if (!user) {
      return res.status(404).send({ error: 'User not found!' });
    }

    user.tasks = user.tasks.filter((item) => item._id != taskId);

    await user.save(); 

    res.status(200).send(user.tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


module.exports = router;
