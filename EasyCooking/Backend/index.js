const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 1000;


// ✅ Middleware to parse JSON request bodies
app.use(express.json());

// ✅ Connect to MongoDB
async function main() {
  await mongoose.connect("mongodb+srv://chetankumar8051:TEywoKIrjTBKP4C3@cluster0.i84o5ob.mongodb.net/QuickHome?retryWrites=true&w=majority&appName=Cluster0");
}
main()
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// ✅ Basic test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ✅ Test user schema & insertion (your original logic)
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});
const user = mongoose.model("user", userSchema);

let user1 = new user({
  name: "Ch",
  age: 14,
  email: "tyrrt"
});
user1.save()
  .then((res) => {
    console.log("✅ Dummy user saved:", res);
  })
  .catch((err) => {
    console.log("❌ Error saving user:", err);
  });

// ✅ Import and use your order routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
