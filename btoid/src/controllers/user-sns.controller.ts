import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../configs/typeorm';


export async function create(req: Request, res: Response, next: NextFunction) {
  const userSnsRepository = dataSource.getRepository('UserSns');

  try {
    req.body.user_id = req.session.user_id;
    const result = await userSnsRepository.save(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function readAll(req: Request, res: Response, next: NextFunction) {
  const userSnsRepository = dataSource.getRepository('UserSns');

  try {
    const result = await userSnsRepository.find({
      where: { user_id: req.params.id },
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
/*
export async function readOne(req: Request, res: Response, next: NextFunction) {
  const userSnsRepository = dataSource.getRepository('UserSns');

  try {
    const result = await userSnsRepository.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}*/

export async function update(req: Request, res: Response, next: NextFunction) {
  const userSnsRepository = dataSource.getRepository('UserSns');

  try {
    const result = await userSnsRepository.update({ user_id: req.session.user_id }, { ...req.body });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const userSnsRepository = dataSource.getRepository('UserSns');

  try {
    const result = await userSnsRepository.delete({id : req.body.id, user_id:req.session.user_id} );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
