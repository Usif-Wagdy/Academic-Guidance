const User = require('../Models/userModel');
const validator = require('validator');
const mongoose = require('mongoose');

exports.addImage = async (req, res) => {
  try {
    const userId = req.params.id.trim();

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ error: 'Invalid user ID format' });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ error: 'No photo uploaded' });
    }

    const imageUrl = req.file.path;

    const updatedUser = await exports.updateUserPhoto(
      userId,
      imageUrl,
    );

    res.status(200).json({
      message: 'Photo uploaded successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Photo upload failed' });
  }
};

exports.updateUserPhoto = async (userId, imageUrl) => {
  try {
    
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: imageUrl },
      { new: true },
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  } catch (error) {
    console.error(
      'Error updating user photo:',
      error.message,
    );
    throw error;
  }
};



const escapeHtml = (str) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};


exports.updateUser = async (req, res) => {
  try {
    const userId  = req.params.id; 
    const updateData = req.body; 

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const restrictedFields = ['password', '_id', 'createdAt', 'isAdmin'];
    restrictedFields.forEach(field => delete updateData[field]);

    if (updateData.email && !validator.isEmail(updateData.email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

  

    if ( updateData.age < 0) {
      return res.status(400).json({ error: 'Invalid age' });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });

  } catch (error) {
    console.error('Error updating user:', error.message);
    res
    .status(500)
    .send('Server error: ' + escapeHtml(error.message));  }
};
