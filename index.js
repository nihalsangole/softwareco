const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const projectRoute = require('./routes/project');
dotenv.config();

const DB = 'mongodb://localhost:27017/softwareco';

mongoose
  .connect(DB)
  .then(() => console.log('DB Connection Successfull!'))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/projects', projectRoute);

app.listen(5000, () => {
  console.log('Backend server is running!');
});
