const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');
const mongoose = require('mongoose');

const signToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      role: user.role,
      image: user.image,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};

exports.addUser = async (req, res) => {

  try {
    const { name, email, password } = req.body;

    if (!name || name.trim() === '') {
      throw new Error('Name is required');
    }

    if (!email || !validator.isEmail(email)) {
      throw new Error('A valid email is required');
    }

    if (
      !password     ) {
      throw new Error(
        'Password required ',
      );
    }

    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      throw new Error(
        `The email ${email} is already registered.`,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
     
    });

    await newUser.save();


    res.status(201).json({
      message:
        'User registered successfully. ',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
   


    res.status(500).json({
      message: 'Error registering user',
      error: error.message,
    });
    console.error(
      `Error during user registration: ${error}`,
    );
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send('Email and password are required');
    }

    console.log('Login Request Body:', req.body);

    const user = await User.findOne({ email }).select(
      '+password',
    );
    if (!user) {
      console.log('User not found for email:', email);
      return res
        .status(401)
        .send('Invalid email or password');
    }

    console.log('User retrieved from DB:', user);

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return res
        .status(401)
        .send('Invalid email or password');
    }

    const token = signToken(user);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

