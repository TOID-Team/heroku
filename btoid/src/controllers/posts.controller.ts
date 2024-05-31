import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../configs/typeorm';
import { PostLikes } from '../entities/post-likes.entity';
import { PostComments } from '../entities/post-comments.entity';

export async function create(req: Request, res: Response, next: NextFunction) {
  const repo = dataSource.getRepository('Posts');
  if (!req.session.user_id) {
    res.status(401).json('401');
    return;
  }

  req.body.user_id = req.session.user_id;

  try {

    const result = await repo.save(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function readAll(req: Request, res: Response, next: NextFunction) {
  const {
    user_id,
    user_id_comment,
    post_like_user_id,
    sort_by_like,
    search,
    page,
    limit,
  } = req.query;
  const repo = dataSource.getRepository('Posts');

  const pageNum = parseInt(page as string);
  const limitNum = parseInt(limit as string);
  const offset = (pageNum - 1) * limitNum;

  try {
    let query = repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.post_likes', 'post_likes')
      .leftJoinAndSelect('post.post_comments', 'post_comments')
      .leftJoinAndSelect('post.post_images', 'post_images');

    if (sort_by_like === 'true') {
      query = query
        .addSelect('COUNT(post_likes.id)', 'like_count')
        .leftJoin('post_likes', 'pl', 'pl.post_id = post.id')
        .groupBy('post.id')
        .addGroupBy('user.id')
        .addGroupBy('post_comments.id')
        .addGroupBy('post_likes.id')
        .addGroupBy('post_images.id')
        .orderBy('like_count', 'DESC');
    } else {
      query = query.orderBy('post.created_at', 'DESC');
    }

    if (search) {
      query = query.andWhere(
        '(post.title LIKE :search OR post.content LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (user_id) {
      query = query.andWhere('user.id = :user_id', { user_id });
    }

    if (user_id_comment) {
      query = query.andWhere('post_comments.user_id = :user_id_comment', {
        user_id_comment,
      });
    }

    if (post_like_user_id) {
      query = query.andWhere('post_likes.user_id = :post_like_user_id', {
        post_like_user_id,
      });
    }

    if (!Number.isNaN(offset) && !Number.isNaN(limitNum)) {

      query = query.skip(offset).take(limitNum);
    }

    const [results, total] = await query.getManyAndCount();

    res.status(200).json({
      data: results,
      total,
      currentPage: pageNum,
      lastPage: Math.ceil(total / limitNum),
    });
  } catch (error) {
    next(error);
  }
}

export async function readOne(req: Request, res: Response, next: NextFunction) {
  const postId = req.params.id;
  const repo = dataSource.getRepository('Posts');

  try {
    const query = repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.post_likes', 'post_likes') 
      .leftJoinAndSelect('post.post_comments', 'post_comments')
      .leftJoinAndSelect('post_comments.user', 'comment_user') 
      .leftJoinAndSelect('post.post_images', 'post_images')
      .leftJoin('post.user', 'user') 
      .addSelect('user.name') 
      .where('post.id = :id', { id: postId }); 

    const result = await query.getOne();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user_id) res.status(401).json('401');
  const repo = dataSource.getRepository('Posts');

  try {
    const result = await repo.update(req.body.id, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user_id) res.status(401).json('401');
  const repo = dataSource.getRepository('Posts');

  try {
    const result = await repo.delete(req.body.id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
