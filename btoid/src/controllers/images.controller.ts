import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../configs/typeorm';
import { UserKeywords } from '../entities/user-keywords.entity';
import { v4 as uuidv4 } from 'uuid';
import session from 'express-session';
import { uploadToS3,deleteFromS3 } from '../utils/s3';
import sharp from 'sharp';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.session.user_id) {
      res.status(401).json('Unauthorized - No session user ID found.');
      return;
    }
 
    if (!req.headers['content-type'] || !req.headers['content-type'].startsWith('image/')) {
      res.status(415).json('Unsupported Media Type - Only image files are accepted.');
      return;
    }

    const imageBuffer = req.body;
    const webpBuffer = await sharp(imageBuffer).toFormat('webp').resize({
      fit: 'inside',
      withoutEnlargement: true,
      width: 1500,
      height: 1500
    }).toBuffer();


/* 
    try {
      await deleteFromS3(key); 
    } catch (error) {

    } */

    const picUrl = `http://${process.env.S3_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/`+ await uploadToS3(webpBuffer,req); ;
   

    res.status(201).json({ url: picUrl });
  } catch (error) {
    next(error);
  }
}

export async function readOne(req: Request, res: Response, next: NextFunction) {
  
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  
}
