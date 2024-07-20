const express = require('express');
const router = express.Router();
const watchController = require('../controllers/watchController');
const { upload, handleUpload } = require('../middleware/upload');

router.get('/', watchController.getAllWatches);
router.get('/:id', watchController.getWatchById);
router.post('/', upload.single('img'), handleUpload, watchController.createWatch);
router.put('/:id', watchController.updateWatch);
router.delete('/:id', watchController.deleteWatch);

module.exports = router;
