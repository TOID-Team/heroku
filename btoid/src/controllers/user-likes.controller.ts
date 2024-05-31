import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../configs/typeorm';

export async function create(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('UserLikes');
  req.body.user_id = req.session.user_id;


  try {
    const result = await repo.save(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
export async function readAll(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('UserLikes');
  const { profile_id, user_id } = req.query; 

  try {
    let whereClause = {};


    if (profile_id !== undefined && profile_id !== null) {
      whereClause = { ...whereClause, profile_id: profile_id };
    }

    if (user_id !== undefined && user_id !== null) {
      whereClause = { ...whereClause, user_id: user_id };
    }

    const result = await repo.find({
      where: whereClause
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('UserLikes');
  if(!req.session.user_id)
    res.status(401).json('401');
  try {
    const result = await repo.delete(req.body.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
