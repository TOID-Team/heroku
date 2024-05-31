import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../configs/typeorm';

export async function create(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('Works');
  req.body.user_id = req.session.user_id;
  try {
    const result = await repo.save(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
export async function readAll(req: Request, res: Response, next: NextFunction) {
  const worksRepository = dataSource.getRepository('Works');
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 512;
  const skip = (page - 1) * limit;
  const userId = req.query.user_id;

  let whereCondition = {};
  if (userId) {
    whereCondition = { user_id: userId };  // Simplified to match the column directly
  }

  try {
    const [results, total] = await worksRepository.findAndCount({
      where: whereCondition,
      relations: ["work_images"],  // This is the key change to include the related work images
      skip,
      take: limit,
      order: {
        created_at: 'DESC',
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
  const repo = dataSource.getRepository('Works');

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
  const repo = dataSource.getRepository('Works');
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
  const repo = dataSource.getRepository('Works');
  req.body.user_id = req.session.user_id;
  try {
    const result = await repo.delete({id: req.body.id, user_id: req.body.user_id});

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

/*
export async function readAll(req: Request, res: Response, next: NextFunction) {

  const worksRepository = dataSource.getRepository('Works');
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 512;
  const skip = (page - 1) * limit;

  const userId = req.query.user_id;


  let whereCondition = {};
  if (userId) {
    whereCondition = { user: { id: userId } };

  }

  try {
    const [results, total] = await worksRepository.findAndCount({
      where: whereCondition,
      skip,
      take: limit,
      order: {
        created_at: 'DESC',
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
}*/
