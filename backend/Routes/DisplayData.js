const express = require('express');
const router = express.Router();

router.post('/foodData',(req,res) => {
    try{
        // console.log(global.food_Items)
        res.send([global.food_Items,global.food_Category])
        
   
    }catch(error){
           console.error(error.message);
           res.send("server Error")
    }
})

module.exports = router;