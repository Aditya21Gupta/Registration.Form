const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/registrationDB', {
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define mongoose schema and model
const registrationSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  email: String,
  mobileno: String,
  password: String,
});
const Registration = mongoose.model('Registration', registrationSchema);

// Express setup
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/sign_up', async (req, res) => {
    const { name, age, gender, email, mobileno, password } = req.body;
    
    // Create a new Registration document
    const newRegistration = new Registration({
      name,
      age,
      gender,
      email,
      mobileno,
      password,
    });
  
    try {
      // Save to MongoDB
      await newRegistration.save();
      // Redirect to registration complete page
      res.redirect('/registration_complete.html');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error registering user');
    }
  });
  
  app.get("/registration_complete.html;", (req, res)=>{
    res.sendFile (__dirname+"/registration_complete.html");
  })

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
