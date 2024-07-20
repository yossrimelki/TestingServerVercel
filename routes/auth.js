const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const { upload, handleUpload } = require('../middleware/upload');

router.post('/register', upload.single('img'), handleUpload, AuthController.register);
router.post('/login', AuthController.login);
router.post('/forget-password',AuthController.forgetpassword)
router.get('/reset-password', AuthController.reset_password);

module.exports = router;