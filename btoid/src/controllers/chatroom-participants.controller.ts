import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../configs/typeorm';
import { Not } from "typeorm";


export async function create(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user_id) 
    res.status(201).json('400');


  const repo = dataSource.getRepository(
    'ChatroomParticipants',
  );

  try {
    const result = await repo.save(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function readOne(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('ChatroomParticipants');

  try {
    const result = await repo.findOne({
      where: {
        chatroom_id: req.params.id,
        user_id: Not(req.session.user_id),
      },
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
export async function readAll(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user_id){ 
    res.status(201).json('400')
    return;
  }

  req.body.user_id = req.session.user_id;

  const chatroomParticipantsRepo = dataSource.getRepository(
    'ChatroomParticipants',
  );

  try {
    const result = await chatroomParticipantsRepo.find({
      where: { user_id: req.session.user_id },
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user_id) res.status(201).json('400');
  req.body.user_id = req.session.user_id;

  const repo = dataSource.getRepository(
    'ChatroomParticipants',
  );

  try {
    const result = await repo.delete(req.body.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
