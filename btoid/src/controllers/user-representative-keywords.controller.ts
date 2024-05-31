import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../configs/typeorm';

/*export interface UserRepresentativeKeyword {
  id: number;
  user_id: number;
  keyword_id: number;
  created_at: string;
  keyword: {
    id: number;
    user_id: number;
    key: string;
    value: string;
    created_at: string;
  };
}*/
export async function create(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('UserRepresentativeKeywords');

  const repoUserKeywords = dataSource.getRepository('UserKeywords');
  if (!req.session.user_id) res.status(400).json('400');

  try {
    const keyword = await repoUserKeywords.findOne({
      where: { key: req.body.keyword.key, value: req.body.keyword.value },
    });

    req.body.keyword_id = keyword.id;
    req.body.user_id = req.session.user_id;
    delete req.body.id;
    delete req.body.keyword;

    const result = await repo.save(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}
export async function readAll(req: Request, res: Response, next: NextFunction) {
  const userRepresentativeKeywordsRepo = dataSource.getRepository(
    'UserRepresentativeKeywords',
  );
  const userKeywordsRepo = dataSource.getRepository('UserKeywords');

  try {
    const result = await userRepresentativeKeywordsRepo
      .createQueryBuilder('urk')
      .innerJoinAndSelect('urk.keyword', 'uk')
      .where('urk.user_id = :userId', { userId: req.params.id })
      .getMany();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
/*
export async function readAll(req: Request, res: Response, next: NextFunction) {
  const userRepresentativeKeywordsRepo = dataSource.getRepository(
    'UserRepresentativeKeywords',
  );

  try {
    const result = await userRepresentativeKeywordsRepo.find({where:{user_id :req.params.id}});

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}*/
/*
export async function readOne(req: Request, res: Response, next: NextFunction) {
  const userRepresentativeKeywordsRepo = dataSource.getRepository(
    'UserRepresentativeKeywords',
  );

  try {
    const result = await userRepresentativeKeywordsRepo.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}*/
/*    if(req.session.id !== result[0].user_id)
    {
      res.status(400).json('400');
    } */
/*
export async function update(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository(
    'UserRepresentativeKeywords',
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
  const representativeKeywordsRepo = dataSource.getRepository(
    'UserRepresentativeKeywords',
  );

  try {
    const result = await representativeKeywordsRepo.delete({
      id: req.body.id,
      user_id: req.session.user_id,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
