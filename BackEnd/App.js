const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const courseRouter = require('./Routes/courseRoutes');
const testimonialRouter = require('./Routes/testimonialRoutes');
const internRouter = require('./Routes/internRoutes');
const userRouter = require('./Routes/userRoutes');
const blogRouter = require('./Routes/blogRoutes');

const app = express();

app.use(cors());


app.use(morgan('dev'));
app.use(express.json());

app.use("/courses", courseRouter);
app.use("/testimonials", testimonialRouter);
app.use("/users", userRouter);
app.use("/interns", internRouter);
app.use("/blogs", blogRouter);

module.exports = app;