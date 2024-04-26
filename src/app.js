// src/app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const userInfoRoutes = require('./routes/userInfoRoutes');
const authRoutes = require('./routes/authRoutes');
const passport = require('./middleware/passport');


const app = express();
const PORT = process.env.PORT || 8080;

// Database connection
db.sequelize.sync() // { force: true }
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

app.use(bodyParser.json());

// Passport and authentication state
app.use(passport.initialize());

//uploaded images
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/userinfo', userInfoRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
