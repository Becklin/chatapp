require("dotenv").config();

// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region

// Create S3 service object
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  // accessKeyId: process.env.AWS_SECRET_ACCESS_KEY,
  apiVersion: "test-1027",
});

// Create the parameters for calling createBucket
var bucketParams = {
  Bucket: process.argv[2],
};

// call S3 to create the bucket
s3.createBucket(bucketParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Location);
  }
});
