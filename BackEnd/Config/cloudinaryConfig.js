const cloudinary = require('cloudinary').v2;
const {
  CloudinaryStorage,
} = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({
  cloud_name: 'dvgsyjlmw',
  api_key: '752346759644142',
  api_secret: 'cWifB4c-hreQ2fS9QUTB1Mt7peQ',
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'user_photos', 
allowed_formats: ['jpeg', 'png', 'jpg'], 

  },
});

const upload = multer({ storage });


module.exports = { cloudinary, upload }; 
