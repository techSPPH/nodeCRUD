// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const userInfoRoutes = require('./routes/userInfoRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// Database connection
db.sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synced successfully.');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

app.use(bodyParser.json());

// Routes
app.use('/userinfo', userInfoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
