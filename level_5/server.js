const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const workers = require('./routes/api/workers');
const shifts = require('./routes/api/shifts');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Error: ', err));

// Use Routes to connect, save typing (see routes)
app.use('/api/workers', workers);
app.use('/api/shifts', shifts);

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
