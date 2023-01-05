require('dotenv').config()
const express = require("express");
const Razorpay = require("razorpay");
const cors = require('cors');
const path = require('path')
const app = express();

app.use(cors({
    origin:"*"
}))
app.use(express.static("./public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to razorpay");
});

app.post("/order", async(req, res) => {
  const amount = req.body.amount;
  var instance = new Razorpay({
    key_id:process.env.kEY_ID,
    key_secret:process.env.SECRET_KEY,
  });

  const option={
      amount: amount *100,
      currency: "INR",
      receipt: "receipt#1",
  }

  const myOrder=await instance.orders.create(option);

  res.status(201).json({
    success:true,
    amount,
    order:myOrder,
  })
});

app.listen(4000, () => {
  console.log("server is running on server 4000...");
});
