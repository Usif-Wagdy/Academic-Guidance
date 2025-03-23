const express = require('express');
const morgan = require('morgan');
const courseRouter = require('./Routes/courseRoutes');
const testimonialRouter = require('./Routes/testimonialRoutes');
const userRouter = require('./Routes/userRoutes');
const app = express();

app.use(morgan('dev'));
app.use(express.json());



app.use("/courses", courseRouter);
app.use("/testimonials", testimonialRouter);
app.use("/users", userRouter);
module.exports = app;
