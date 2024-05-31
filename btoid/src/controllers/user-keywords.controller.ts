import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../configs/typeorm';

export async function create(req: Request, res: Response, next: NextFunction) {
  const userKeywordsRepository =
    dataSource.getRepository('UserKeywords');
  
  if(!req.session.user_id) res.status(400).json('400');
  
  try {
    req.body.user_id = req.session.user_id;
    const result = await userKeywordsRepository.save(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function readAll(req: Request, res: Response, next: NextFunction) {
  const userKeywordsRepository =
    dataSource.getRepository('UserKeywords');

  try {
    const result = await userKeywordsRepository.find({
      where: { user_id: req.params.id },
    });

   


    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function readOne(req: Request, res: Response, next: NextFunction) {
  const userKeywordsRepository =
    dataSource.getRepository('UserKeywords');

  try {
    const result = await userKeywordsRepository.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
/*
export async function update(req: Request, res: Response, next: NextFunction) {
  const repo =
    dataSource.getRepository('UserKeywords');

    
  try {
    const result = await repo.update(
      req.body.id,
      req.body,
    );
    if(req.session.id !== result[0].user_id)
    {
      res.status(400).json('400');
    } 
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}*/

export async function remove(req: Request, res: Response, next: NextFunction) {

  const userKeywordsRepository =
    dataSource.getRepository('UserKeywords');

  try {

    const result = await userKeywordsRepository.delete({id : req.body.id, user_id: req.session.user_id});


    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
