const express = require('express');
const router = express.Router();
const Order = require('../model/Orders');

router.post('/OrderData', async (req, res) => {
  try {
    console.log("Incoming Order Data:", req.body); // Debugging log

    if (!req.body.email || !req.body.order_data || !req.body.order_date) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    let data = req.body.order_data;
    data.splice(0, 0, { order_date: req.body.order_date });

    let emlId = await Order.findOne({ email: req.body.email });

    if (!emlId) {
      await Order.create({
        email: req.body.email,
        order_data: [data]
      });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error in /OrderData route:", error);
    res.status(500).send("Server Error: " + error.message);
  }
});

router.post('/MyOrderData', async (req, res) => {
 try{
 let myData = await Order.findOne({'email':req.body.email})
 res.json({OrderData: myData})
 }catch(error){
  console.error("Error in /OrderData route:", error);
  res.status(500).send("Server Error: " + error.message);
 }
})

module.exports = router;
