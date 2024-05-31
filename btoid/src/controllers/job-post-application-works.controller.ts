import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../configs/typeorm';

export async function create(req: Request, res: Response, next: NextFunction) 
{
  if(!req.session.user_id)
    res.status(401).json('401');

  req.body.user_id = req.session.user_id;

  const repo = dataSource.getRepository(
    'JobPostApplicationWorks',
  );

  try {
    const result = await repo.save(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function readAll(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository(
    'JobPostApplicationWorks',
  );

  try {
    const result = await repo.find();

    res.status(200).json(result);
  } catch (error) {
    next(error);
 
  }
}
/*
export async function readOne(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository(
    'JobPostApplicationWorks',
  );

  try {
    const result = await repo.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository(
    'JobPostApplicationWorks',
  );

  try {
    const result = await repo.update(
      req.body.id,
      req.body,
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}*/

export async function remove(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository(
    'JobPostApplicationWorks',
  );

  try {
    const result = await repo.delete(req.body.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}