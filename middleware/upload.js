const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const path = require('path');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, callback) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      callback(null, true);
    } else {
      console.log('Only JPEG and PNG files are supported!');
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2 // 2MB limit
  }
});

const uploadToS3 = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}${path.extname(file.originalname)}`,
    Body: file.buffer,
    ACL: 'public-read',
    ContentType: file.mimetype,
  };

  try {
    const upload = new Upload({
      client: s3Client,
      params: params
    });
    const result = await upload.done();
    return result.Location;
  } catch (err) {
    console.error('Error uploading to S3:', err);
    throw err;
  }
};

const handleUpload = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  try {
    const imageUrl = await uploadToS3(req.file);
    req.file.location = imageUrl;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload image to S3' });
  }
};

module.exports = {
  upload,
  handleUpload
};
