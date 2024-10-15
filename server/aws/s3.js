const dotenv = require("dotenv");
const aws = require("aws-sdk");
const crypto = require("crypto");
const { promisify } = require("util");

dotenv.config();

const randomBytes = promisify(crypto.randomBytes);

const region = "us-east-2";
const bucketName = "ingrain-image-upload-s3-bucket";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

async function generateUploadURL() {
  const rawBytes = await randomBytes(16);   // generate 16 random bytes
  const imageName = rawBytes.toString("hex");   // convert bytes to hex string (32 hex characters string)

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

// delete image from S3 bucket
async function deleteImage(imageKey) {
  const params = {
    Bucket: bucketName,
    Key: imageKey,  // key is the filename or path of the object in S3
  };
 
  try {
    await s3.deleteObject(params).promise();  
    console.log(`Image deleted successfully: ${imageKey}`);
  } catch (error) {
    console.error(`Error deleting image: ${error.message}`);
    throw new Error(`Could not delete image: ${error.message}`);
  }
}

module.exports = { generateUploadURL, deleteImage };