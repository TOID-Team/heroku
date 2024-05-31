import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../configs/typeorm';
import { uploadToS3 ,deleteFromS3} from '../utils/s3';


export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.session.user_id) res.status(401).json('401');

    const imageRepo = dataSource.getRepository('PostImages');
  
    const result = await imageRepo.save(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function readAll(req: Request, res: Response, next: NextFunction) {
  const imageRepo = dataSource.getRepository('PostImages');
  const postId = req.query.post_id;

  try {
    let result;
    if (postId) {
      result = await imageRepo.find({ where: { post_id: postId } });
    } else {
      result = await imageRepo.find();
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function readOne(req: Request, res: Response, next: NextFunction) {
  const imageRepo = dataSource.getRepository('PostImages');

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
  if(req.session.user_id)
    res.status(404).json('404');
  const imageRepo = dataSource.getRepository('PostImages');
  try {
    const one = await imageRepo.findOne({
      where: { id: req.body.id, user_id:req.session.user_id },
    });
    const _ = async () => {
      const result = await imageRepo.delete(req.body.id);
      res.status(200).json(result);
    };
    deleteFromS3(one.url).then(() => {
      _();
    });
  } catch (error) {
    next(error);
  }
}

