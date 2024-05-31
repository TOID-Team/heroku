import { Request, Response, NextFunction } from 'express';

import { dataSource } from '../configs/typeorm';

export async function create(req: Request, res: Response, next: NextFunction) {
  const jobAppRepo = dataSource.getRepository('JobPostApplications');

  if (!req.session.user_id) res.status(401).json('401');

  req.body.user_id = req.session.user_id;

  try {
    const result = await jobAppRepo.save(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }

  CreateAppNotification(req.body.job_post_id);
}

async function CreateAppNotification(jobPostId: number) {

  const jobPostsRepository = dataSource.getRepository('JobPosts');

  const jobPost = await jobPostsRepository
    .createQueryBuilder('job_post')
    .select(['job_post.user_id', 'job_post.post_title'])
    .where('job_post.id = :id', { id: jobPostId })
    .getOne();

  const jobPostAppRepo = dataSource.getRepository('JobPostApplications');
  const apps = await jobPostAppRepo.findBy({ job_post_id: jobPostId });

  const notiRepo = dataSource.getRepository('Notifications');

  const _ = await notiRepo.save({
    user_id: jobPost.user_id,
    message: `${jobPost.post_title}의 지원자가 ${apps.length}명이 넘었습니다.`,
  });
}

export async function readOne(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('JobPostApplications');

  if (!req.session.user_id) {
    res.status(401).json('Unauthorized');
    return;
  }

  try {
    const result = await repo.findOne({
      relations: [
        'job_post',
        'job_post_application_works',
        'job_post_application_works.work',
      ],
      where: { id: req.params.id },
    });

    if (!result) {
      res.status(404).json('Application not found');
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('JobPostApplications');
  if (!req.session.user_id) res.status(401).json('401');
  try {
    const result = await repo.delete(req.body.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function readAll(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('JobPostApplications');

  if (!req.session.user_id) {
    res.status(401).json('Unauthorized');
    return;
  }

  try {
    const userId = req.query.user_id;
    const jobPostId = req.query.job_post_id;
    let options = {
      relations: ['job_post', 'user'],
      order: {
        created_at: 'DESC',
      },
      where: {},
    };

    if (userId) {
      options.where['user_id'] = userId;
    }
    if (jobPostId) {
      options.where['job_post_id'] = jobPostId;
    }

    let result = await repo.find(options);
    result.map((ele) => {
      delete ele.user.password;
      delete ele.user.email;
      ele.user.profileImageURL = `http://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${ele.user.profileImageURL}`;
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user_id) {
    res.status(401).json('Unauthorized');
    return;
  }

  const repo = dataSource.getRepository('JobPostApplications');

  try {
    const result = await repo.update(req.body.id, req.body);

    res.status(200).json(result);

    if (req.body.status === 'in_progress') {
      CreateMeetingNotification(req.body.job_post_id);
    }
  } catch (error) {
    next(error);
  }
}

async function CreateMeetingNotification(jobPostId: number) {

  const jobPostRepo = dataSource.getRepository('JobPosts');
  const notiRepo = dataSource.getRepository('Notifications');
  const jobPost = await jobPostRepo.findOneBy({ id: jobPostId });

  const notification = {
    user_id: jobPost.user_id,
    message: `${jobPost.post_title}에서 미팅을 요청했습니다.`,
  };

  const result = await notiRepo.save(notification);
  return result;
}
/*
export async function readAll(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('JobPostApplications');

  if (!req.session.user_id) {
    res.status(401).json('Unauthorized');
    return;
  } 

  try {
    const userId = req.query.user_id;
    let options = {
      relations: ['job_post', 'user'],  
      order: {
        created_at: 'DESC' 
      }
    };

    let result;
    if (userId) {
      result = await repo.find({
        ...options,
        where: {
          user_id: userId
        }
      });
    } else {
      result = await repo.find(options);
    }
    
    result.map(ele => delete ele.user.password);
    result.map(ele => delete ele.user.email);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}*/

/*
export async function readOne(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('JobPostApplications');

  if (!req.session.user_id) {
      res.status(401).json('Unauthorized');
      return;
  }

  try {
      const result = await repo.findOne({
          relations: ['job_post'], 
          where: { id: req.params.id }
      });

      if (!result) {
          res.status(404).json('Application not found'); 
          return;
      }

      res.status(200).json(result);
  } catch (error) {
      next(error);
  }
}*/
/*
export async function readOne(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository(
    'JobPostApplications',
  );
  if (!req.session.user_id) res.status(401).json('401');
  try {
    const result = await repo.findOne({
      where: { id: req.params.id },
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}*/
/**/
