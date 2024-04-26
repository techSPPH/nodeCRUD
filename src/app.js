// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const userInfoRoutes = require('./routes/userInfoRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// Database connection
db.sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

app.use(bodyParser.json());

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/userinfo', userInfoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
