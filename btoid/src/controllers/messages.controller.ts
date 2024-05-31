import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../configs/typeorm';

export async function create(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user_id) res.status(201).json('400');

  req.body.user_id = req.session.user_id;

  const repo = dataSource.getRepository('Messages');

  try {
    const result = await repo.save(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
export async function readAll(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user_id) {
    res.status(400).json('User not logged in');
    return;
  }

  req.body.user_id = req.session.user_id;
  const touchedParam = req.query.touched;
  const messageRepo = dataSource.getRepository('Messages');

  try {
    let whereCondition: any = { chatroom_id: req.body.chatroom_id };
    if (touchedParam !== undefined) {
      whereCondition.touched = touchedParam === 'true';
    }

    const result = await messageRepo.find({
      where: whereCondition,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
/*
export async function readAll(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user_id) res.status(201).json('400');
  req.body.user_id = req.session.user_id;

  const messageRepo = dataSource.getRepository('Messages');

  try {
    const result = await messageRepo.find({
      where: { chatroom_id: req.body.chatroom_id },
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}*/

export async function readOne(req:  Request, res: Response, next: NextFunction) {
  if(!req.session.user_id)
  res.status(201).json('400');
  req.body.user_id = req.session.user_id;

  const repo = dataSource.getRepository('Messages');

  try {
    const result = await repo.find({
      where: { chatroom_id: req.params.id },
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user_id) 
    res.status(201).json('400');


  const repo = dataSource.getRepository('Messages');

  try {
    const result = await repo.update(
      req.body.id,
      req.body,
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
/*
export async function remove(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('Messages');

  try {
    const result = await repo.delete(req.body.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}*/
