import { v4 as uuidv4 } from 'uuid';
import session from 'express-session';
const AWS = require('aws-sdk');
import { Request, Response, NextFunction, Router } from 'express';
interface UploadBody {
  content: Buffer;
  contentType: string;
  contentLength: number;
}

function generateUUID(): string {
  return uuidv4();
}

const protocol = 'http://';


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();


export const uploadToS3 = (buffer : Buffer, req: Request<{}, {}, UploadBody>): Promise<string> => {
  if (!req.body) {
    return Promise.reject(new Error('Content is empty or invalid'));
  }
  const uuidKey = generateUUID();
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: uuidKey,
    Body: buffer,
    ContentType: req.body.contentType,
    ContentLength: req.body.contentLength,
  };

  return new Promise((resolve, reject) => {

    s3.upload(params, (err, data) => {

      if (err) {
        reject(err);
      } else {
        resolve(data.Key);
      }
    });
  });
};

export async function deleteFromS3(key: string): Promise<void> {
  const deleteParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  };

  try {
    const data = await s3.deleteObject(deleteParams).promise();

  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}
