import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../configs/typeorm';

export async function create(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('Notifications');
  req.body.user_id = req.session.user_id;
  try {
    const result = await repo.save(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
export async function readAll(req: Request, res: Response, next: NextFunction) {
  const worksRepository = dataSource.getRepository('Notifications');
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 512;
  const skip = (page - 1) * limit;

  const touched = req.query.touched === 'true';

  try {
    const [results, total] = await worksRepository.findAndCount({
      where: { 
        user_id: req.session.user_id,
        touched: touched 
      },
      skip,
      take: limit,
      order: {
        id: 'DESC',
      },
    });

    res.status(200).json({
      data: results,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
}
export async function readOne(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('Notifications');

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
  const repo = dataSource.getRepository('Notifications');
  req.body.user_id = req.session.user_id;
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

export async function remove(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('Notifications');
  req.body.user_id = req.session.user_id;
  try {
    const result = await repo.delete({id: req.body.id, user_id: req.body.user_id});

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
