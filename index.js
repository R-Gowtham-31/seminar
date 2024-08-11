import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userModel from './Models/user.js';
import markModel from './Models/mark.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://gowtham:Gowtham31@cluster0.9grh9m9.mongodb.net/")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// Sample API
app.get('/', (req, res) => {
  res.send("This is server side");
});

// Signup API
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      const newUser = new userModel({
        name,
        email,
        password: password,
      });
      const newMark = new markModel({
        name,
        email,
      });
      await newUser.save();
      await newMark.save();
      res.status(201).send({ message: "Signup Successfully" });
    } else {
      res.status(400).send({ message: "User already exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Login API
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).send({ message: "User does not exist" });
    } else {
      if (password === user.password) {
        res.status(200).send({ message: "Login successful" });
      } else {
        res.status(400).send({ message: "Password Incorrect" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Get Student API
app.post('/get-student', async (req, res) => {
  try {
    const { email } = req.body;
    const student = await markModel.findOne({ email }); // Adjust query as needed
    if (!student) {
      return res.status(400).json({ message: 'Please relogin' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update Student API
app.post('/update-student', async (req, res) => {
  try {
    const { name, email, sem1, sem2, sem3, sem4, sem5, sem6 } = req.body;

    // Update or create the student record
    const student = await markModel.findOneAndUpdate(
      { email }, // Using email to find the student
      { sem1, sem2, sem3, sem4, sem5, sem6 },
      { new: true, upsert: true } // Create if not found
    );

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete Student API
app.delete('/delete-student', async (req, res) => {
  try {
    const { email } = req.body;

    // Delete the student record
    const result = await markModel.deleteOne({ email });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const user = await userModel.findOne({ email });
    const newMark = new markModel({
        name:user.name,
        email,
      });
      await newMark.save();
    res.status(200).json({ message: 'Student record deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
