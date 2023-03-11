const express = require('express');
const app = express();

const dbConnection = require('./db');

require('dotenv').config();
app.use(express.json());

dbConnection();

const port = process.env.PORT || 1509;

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});

const studentRoutes = require('./routes/student');
const mentorRoutes = require('./routes/mentor');

app.use("/api/students", studentRoutes);
app.use("/api/mentors", mentorRoutes);