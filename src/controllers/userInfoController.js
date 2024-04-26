// src/controllers/userInfoController.js
const db = require('../models');
const multer = require('multer');

const UserInfo = db.userInfo;

// Multer 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './img'); //upload directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('image');

exports.create = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: 'File upload error' });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Image uploaded successfully, now create user info
    const { Fname, Lname, age } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    UserInfo.create({ Fname, Lname, age, image: imagePath })
      .then(userInfo => res.json(userInfo))
      .catch(error => res.status(500).json({ error: error.message }));
  });
};

exports.findAll = (req, res) => {
  UserInfo.findAll()
    .then(userInfos => res.json(userInfos))
    .catch(error => res.status(500).json({ error: error.message }));
};

exports.findOne = (req, res) => {
  const { id } = req.params;
  UserInfo.findByPk(id)
    .then(userInfo => {
      if (!userInfo) {
        res.status(404).json({ error: 'User info not found' });
      } else {
        res.json(userInfo);
      }
    })
    .catch(error => res.status(500).json({ error: error.message }));
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { Fname, Lname, age } = req.body;
  UserInfo.update({ Fname, Lname, age }, { where: { id } })
    .then(([updated]) => {
      if (updated) {
        return UserInfo.findByPk(id);
      } else {
        res.status(404).json({ error: 'User info not found' });
      }
    })
    .then(updatedUserInfo => {
      if (updatedUserInfo) {
        res.json({ message: 'User info updated successfully', userInfo: updatedUserInfo });
      }
    })
    .catch(error => res.status(500).json({ error: error.message }));
};

exports.delete = (req, res) => {
  const { id } = req.params;
  UserInfo.destroy({ where: { id } })
    .then(deleted => {
      if (deleted) {
        res.json({ message: 'User info deleted successfully' });
      } else {
        res.status(404).json({ error: 'User info not found' });
      }
    })
    .catch(error => res.status(500).json({ error: error.message }));
};
