const db = require('../models');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

// Login
exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return res.json({ token });
    });
  })(req, res, next);
};

const upload = multer({ storage: storage }).single('image');


//create
exports.create = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: 'File upload error' });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }
    const { Fname, Lname, age, email, password } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    UserInfo.create({ Fname, Lname, age, email, password, image: imagePath })
      .then(userInfo => res.json(userInfo))
      .catch(error => res.status(500).json({ error: error.message }));
  });
};


//read
exports.findAll = (req, res) => {
  UserInfo.findAll()
    .then(userInfos => res.json(userInfos))
    .catch(error => res.status(500).json({ error: error.message }));
};

//search
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

//update
exports.update = (req, res) => {
  const { id } = req.params;
  const { Fname, Lname, age, email, password } = req.body;
  UserInfo.update({ Fname, Lname, age, email, password }, { where: { id } })
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

//delete
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
