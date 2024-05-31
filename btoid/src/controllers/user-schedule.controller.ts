import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../configs/typeorm';

export async function create(req: Request, res: Response, next: NextFunction) {
  const userScheduleRepo = dataSource.getRepository('UserSchedule');

  try {
    req.body.user_id = req.session.user_id;
    const result = await userScheduleRepo.save(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function readAll(req: Request, res: Response, next: NextFunction) {
  const userScheduleRepo = dataSource.getRepository('UserSchedule');

  try {
    const result = await userScheduleRepo.find({
      where: { user_id: req.query.user_id },
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

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
}

export async function update(req: Request, res: Response, next: NextFunction) {
  const userScheduleRepo = dataSource.getRepository('UserSchedule');

  try {
    const result = await userScheduleRepo.update({ user_id: req.session.user_id }, { ...req.body });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const userScheduleRepo = dataSource.getRepository('UserSchedule');

  try {
    const result = await userScheduleRepo.delete({id : req.body.id, user_id:req.session.user_id} );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
