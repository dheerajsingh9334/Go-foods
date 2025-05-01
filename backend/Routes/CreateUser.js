const express = require('express');
const router = express.Router();
const User = require('../model/User'); // Make sure path is correct
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = "MynameisDheerajSinghBYEBYE"

router.post("/createUser",[
    body('email','Email is Invalid').isEmail(),
    body('password','Incorrect Password').isLength({min:5}),
    body('location','invalid location').isLength({min:5})
] ,async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

const salt = await bcrypt.genSalt(10);
let secPassword = await bcrypt.hash(req.body.password, salt)

    try {
        // Test if User model works
        // console.log("User model test:", typeof User.create); // Should show 'function'
        
        const user = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });
        
        res.json({ 
            success: true,
            user:{
                id: user._id,
                name: user.name,
                email:user.email,
                location:user.location
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ 
            success: false,
            error:"INternal server Error"
        });
    }
});



router.post("/loginUser",[
     body('email','Email is Invalid').isEmail(),
    body('password','Incorrect Password').isLength({min:5})],async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
       
    let email = req.body.email;
    try {
        // Test if User model works
        // console.log("User modry el test:", typeof User.create); // Should show 'function'
        
        let UserData = await User.findOne({email});
            if(!UserData){
                return res.status(400).json({error: "Try Logging with Correct email"})
            }

const pwdCompare = await bcrypt.compare(req.body.password, UserData.password);

            if(!pwdCompare){
                return res.status(400).json({error: "Try Logging with Correct password"})
            }
            const data = {
                user:{
                    id:UserData.id
                }
            }

           const authToken = jwt.sign(data,jwtSecret)

            return res.json({
                authToken:authToken,
                success:true,
                name:UserData.name,
                password:UserData.password
            });


    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ 
            success: false,
            error:"INternal server Error"
        });
    }
});

module.exports = router;