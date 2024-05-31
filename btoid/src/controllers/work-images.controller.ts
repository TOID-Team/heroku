import { Request, Response, NextFunction, Router } from 'express';
import { dataSource } from '../configs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import session from 'express-session';
import { uploadToS3,deleteFromS3 } from '../utils/s3';


export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.session.user_id) res.status(401).json('401');

    const imageRepo = dataSource.getRepository('WorkImages');
  
    const result = await imageRepo.save(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function readAll(req: Request, res: Response, next: NextFunction) {
  const imageRepo = dataSource.getRepository('WorkImages');
  const userId = req.query.user_id as string | undefined;
  const workId = req.query.work_id as string | undefined;

  try {
    let result;
    if (userId && workId) {
      result = await imageRepo.find({ where: { user_id: userId, work_id: workId } });
    } else if (userId) {
      result = await imageRepo.find({ where: { user_id: userId } });
    } else if (workId) {
      result = await imageRepo.find({ where: { work_id: workId } });
    } else {
      result = await imageRepo.find();
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function readOne(req: Request, res: Response, next: NextFunction) {
  const imageRepo = dataSource.getRepository('WorkImages');

  try {
    const result = await imageRepo.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  if(!req.session.user_id)
    res.status(400).json('400');
  const imageRepo = dataSource.getRepository('WorkImages');
  try {
    const one = await imageRepo.findOne({
      where: { id: req.body.id, user_id:req.session.user_id },
    });

    const _ = async () => {
      const result = await imageRepo.delete(req.body.id);
      res.status(200).json(result);
    };

    if(req.body.id)
      {
        deleteFromS3(one.image_url).then(() => {
          _();
        });
      }
   else{
    res.status(400).json('400');
   }
  } catch (error) {
    next(error);
  }
}
