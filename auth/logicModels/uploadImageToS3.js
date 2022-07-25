const AWS = require("aws-sdk");
const { AWS_CONSTANTS } = require("../constants");

AWS.config.update({
  region: AWS_CONSTANTS.REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

exports.uploadImageTos3 = async (buffer) => {
  buffer = buffer.split(",");
  let ContentType = buffer[0].split(":")[1].split(";")[0];
  buffer = buffer.split(",")[1];

  let imagePath = Date.now();
  const uploadParams = {
    Bucket: AWS_CONSTANTS.BUCKET_NAME,
    Key: AWS_CONSTANTS.DIRECTORY + imagePath,
    Body: buffer,
    ACL: "public-read",
    ContentType,
  };

  return new Promise((resolve, reject) => {
    s3.putObject(uploadParams, (err, data) => {
      if (err) {
        return null;
      } else if (data) {
        resolve(
          `https://${AWS_CONSTANTS.BUCKET_NAME}.s3.${AWS_CONSTANTS.REGION}.amazonaws.com/${AWS_CONSTANTS.DIRECTORY}${imagePath}`
        );
      }
    });
  }).catch((err) => {
    console.log("image upload failed", err);
    return null;
  });
};
