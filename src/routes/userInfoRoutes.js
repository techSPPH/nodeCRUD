const express = require('express');
const router = express.Router();
const userInfoController = require('../controllers/userInfoController');

// CRUD operations
router.post('/', userInfoController.create);
router.get('/', userInfoController.findAll);
router.get('/:id', userInfoController.findOne);
router.put('/:id', userInfoController.update);
router.delete('/:id', userInfoController.delete);

module.exports = router;
