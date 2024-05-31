import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../configs/typeorm';
import { Z_ASCII } from 'zlib';

export async function readAll(req: Request, res: Response, next: NextFunction) {
  const jobPostsRepository = dataSource.getRepository('JobPosts');

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const {
    post_title,
    min_age,
    max_age,
    max_height,
    min_height,
    min_foot_size,
    max_foot_size,
    nationality,
    post_type,
    gender,
    driver_license,
    work_size,
    keywords,
    user_id,
    pay,
  } = req.query;

  try {
    const query = jobPostsRepository.createQueryBuilder('jobPost');

    if (post_title) {
      query.andWhere('jobPost.post_title LIKE :post_title', {
        post_title: `%${post_title}%`,
      });
    }

    if (nationality) {
      query.andWhere('jobPost.nationality = :nationality', { nationality });
    }
    const z = 0;
    if (pay === 'pay') {
      query.andWhere('jobPost.fee > :z', { z });
    }

    if (pay === 'no_pay') {
      query.andWhere('jobPost.fee = :z', { z });
    }

    if (post_type) {
      query.andWhere('jobPost.post_type = :post_type', { post_type });
    }

    const both = 'both'
    if (gender) {
      query.andWhere('(jobPost.gender = :gender OR jobPost.gender = :both)', { gender ,both});
    } 

    if (driver_license) {
      query.andWhere('jobPost.driver_license = :driver_license', {
        driver_license,
      });
    }
    

    if (work_size) {
      query.andWhere('jobPost.work_size = :work_size', { work_size });
    }

    if (min_age) {
      query.andWhere('jobPost.min_age >= :min_age', { min_age });
    }

    if (max_age) {
      query.andWhere('jobPost.max_age <= :max_age', { max_age });
    }

    if (min_height) {
      query.andWhere('jobPost.min_height >= :min_height', { min_height });
    }

    if (max_height) {
      query.andWhere('jobPost.max_height <= :max_height', { max_height });
    }
    if (min_foot_size) {
      query.andWhere('jobPost.min_foot_size >= :min_foot_size', {
        min_foot_size,
      });
    }

    if (max_foot_size) {
      query.andWhere('jobPost.max_foot_size <= :max_foot_size', {
        max_foot_size,
      });
    }

    if (typeof keywords === 'string') {
      const keywordArray = keywords.split(',').map((keyword) => keyword.trim());
      query.innerJoinAndSelect(
        'jobPost.job_post_keywords',
        'jobPostKeyword',
        'jobPostKeyword.keyword IN (:...keywords)',
        { keywords: keywordArray },
      );
    }

    if (user_id) {
      query.andWhere('jobPost.user_id = :user_id', { user_id });
    }
    query.orderBy('jobPost.created_at', 'DESC');
    const totalCount = await query.getCount();
    const total = Math.ceil(totalCount / limit);

    query.offset(skip).limit(limit);

    const results = await query.getMany();

    res.status(200).json({
      data: results,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  const jonPostRepo = dataSource.getRepository('JobPosts');
  if (!req.session.user_id) {
    res.status(401).json('401');
  }

  req.body.user_id = req.session.user_id;

  if (req.body.type === 'both') {
    req.body.type = null;
  }

  try {
    const result = await jonPostRepo.save(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function readOne(req: Request, res: Response, next: NextFunction) {
  const jobPostsRepository = dataSource.getRepository('JobPosts');

  try {
    const result = await jobPostsRepository
      .createQueryBuilder('job_post')
      .leftJoinAndSelect('job_post.job_post_keywords', 'keyword')
      .where('job_post.id = :id', { id: req.params.id })
      .getOne();

    if (result) {
      res.status(200).json(result);

      result.post_views += 1;
      await jobPostsRepository.save(result);
    } else {
      res.status(404).send('Job Post not found');
    }
  } catch (error) {
    next(error);
  }
}
/*
export async function readOne(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('JobPosts');

  try {
    const result = await repo.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
*/
export async function update(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('JobPosts');

  try {
    const result = await repo.update(req.body.id, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('JobPosts');

  try {
    const result = await repo.delete(req.body.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
