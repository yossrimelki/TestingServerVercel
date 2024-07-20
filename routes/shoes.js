const express = require('express');
const shoesController = require('../controllers/shoesController');
const { upload, handleUpload } = require('../middleware/upload');

const router = express.Router();

router.get('/', shoesController.getAllShoes);
router.get('/:id', shoesController.getShoeById);
router.post('/', shoesController.createShoe);
router.put('/:id', shoesController.updateShoe);
router.delete('/:id', shoesController.deleteShoe);

module.exports = router;
