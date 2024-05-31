import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../configs/typeorm';

export async function create(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user_id) res.status(401).json('401');

  req.body.user_id = req.session.user_id;

  const repo = dataSource.getRepository('UserGuestbooks');

  try {
    const result = await repo.save(req.body);
    delete result.user.password;
    delete result.user.email;
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function readAll(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('UserGuestbooks');

  try {
    const results = await repo.find({
      relations: ['user']  
    });

    results.forEach(result => 
    {
      delete result.user.password;
      delete result.user.email;
      result.user.profileImageURL = `http://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${result.user.profileImageURL}`;
    });

    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
}

export async function readOne(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('UserGuestbooks');

  try {
    const result = await repo.findOne({
      where: { id: req.params.id },
      relations: ['user'] 
    });

    result.profileImageURL = `http://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${result.profileImageURL}`;

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
/*
export async function readAll(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('UserGuestbooks');

  try {
    const result = await repo.find();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function readOne(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('UserGuestbooks');

  try {
    const result = await repo.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}*/

export async function update(req: Request, res: Response, next: NextFunction) {

  if (!req.session.user_id) res.status(401).json('401');

  const repo = dataSource.getRepository('UserGuestbooks');

  try {
    const result = await repo.update(req.body.id, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  
  if (!req.session.user_id) res.status(401).json('401');

  const repo = dataSource.getRepository('UserGuestbooks');

  try {
    const result = await repo.delete(req.body.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
