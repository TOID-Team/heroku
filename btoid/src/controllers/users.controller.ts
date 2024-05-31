import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../configs/typeorm';
import { UserKeywords } from '../entities/user-keywords.entity';
import { v4 as uuidv4 } from 'uuid';
import session from 'express-session';
import { uploadToS3, deleteFromS3 } from '../utils/s3';
import sharp from 'sharp';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.session.user_id) {
      res.status(401).json('Unauthorized - No session user ID found.');
      return;
    }
    if (
      !req.headers['content-type'] ||
      !req.headers['content-type'].startsWith('image/')
    ) {
      res
        .status(415)
        .json('Unsupported Media Type - Only image files are accepted.');
      return;
    }

    const userRepo = dataSource.getRepository('users');
    const imageBuffer = req.body;
 
    const webpBuffer = await sharp(imageBuffer).toFormat('webp').resize({
      fit: 'inside',
      withoutEnlargement: true,
      width: 1500,
      height: 1500
    }).toBuffer();

    const key = await uploadToS3(webpBuffer,req);

    const user = await userRepo.findOneBy({ id: req.session.user_id });
    if (user && user.profileImageURL) {
      await deleteFromS3(user.profileImageURL);
    }

        const result = await userRepo.update(req.session.user_id, {
      profileImageURL: key,
    });

  
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function aaa(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.session.user_id) {
      res.status(401).json('Unauthorized - No session user ID found.');
      return;
    }

    if (!req.headers['content-type'] || !req.headers['content-type'].startsWith('image/')) {
      res.status(415).json('Unsupported Media Type - Only image files are accepted.');
      return;
    }

    const imageBuffer = Buffer.from(req.body.image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const webpBuffer = await sharp(imageBuffer).toFormat('webp').toBuffer();
    const key = `images/${uuidv4()}.webp`;

    try {
      await deleteFromS3(key); 
    } catch (error) {

    }

    const picUrl = `http://${process.env.S3_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${key}`;
    await uploadToS3(webpBuffer,req); 

    res.status(201).json({ url: picUrl });
  } catch (error) {
    next(error);
  }
}
export async function readAll(req: Request, res: Response, next: NextFunction) {
  const userRepository = dataSource.getRepository('Users');

  let {
    page = 1,
    limit = 512,
    type,
    gender,
    race,
    name,
    max_height,
    min_height,
    max_weight,
    min_weight,
    max_foot_size,
    min_foot_size,
    max_birth_date,
    min_birth_date,
    fee,
    can_negotiate_fee,
    can_poomasi,
    drivers_license,
    style,
    sports,
    specialty,
    nose,
    mouth,
    language,
    hair_style,
    eye,
    dialect,
    nationality,
  } = req.query;
  page = parseInt(page as string);
  limit = parseInt(limit as string);

  try {
    let query = userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect(
        UserKeywords,
        'user_keywords',
        'user.id = user_keywords.user_id',
      );
    const both = 'both';

    
    if (type)
      query = query.andWhere('(user.type = :type  OR user.type =  :both)', {
        type,
        both,
      });

    if (gender) query = query.andWhere('user.gender = :gender', { gender });
    if (race) query = query.andWhere('user.race = :race', { race });
    if (name) {
      query = query.andWhere('user.name ILIKE :name', { name: `%${name}%` });
    }
    if (min_height)
      query = query.andWhere('user.height >= :min_height', { min_height });
    if (max_height)
      query = query.andWhere('user.height <= :max_height', { max_height });
    if (min_weight)
      query = query.andWhere('user.weight >= :min_weight', { min_weight });
    if (max_weight)
      query = query.andWhere('user.weight <= :max_weight', { max_weight });

    if (min_foot_size)
      query = query.andWhere('user.footSize >= :min_foot_size', {
        min_foot_size,
      });
    if (max_foot_size)
      query = query.andWhere('user.footSize <= :max_foot_size', {
        max_foot_size,
      });

    if (min_birth_date)
      query = query.andWhere('user.birthDate >= :min_birth_date', {
        min_birth_date,
      });
    if (max_birth_date)
      query = query.andWhere('user.birthDate <= :max_birth_date', {
        max_birth_date,
      });

    if (can_negotiate_fee)
      query = query.andWhere('user.can_negotiate_fee = :can_negotiate_fee', {
        can_negotiate_fee: can_negotiate_fee === 'true',
      });
    if (can_poomasi)
      query = query.andWhere('user.can_poomasi = :can_poomasi', {
        can_poomasi: can_poomasi === 'true',
      });
    if (drivers_license)
      query.andWhere('user.drivers_license ILIKE :drivers_license', {
        drivers_license: `%${drivers_license}%`,
      });

    /**    queryParams.style = askUser.style.join(',');
    queryParams.dialect = askUser.dialect.join(',');
    queryParams.eye = askUser.eye.join(',');
    queryParams.nose = askUser.nose.join(',');
    queryParams.mouth = askUser.mouth.join(',');
     */
    if (style) {
      const keywords = (style as string).split(',');

      query = query.andWhere("user_keywords.key = 'style'");
      keywords.forEach((keyword, index) => {
        query = query.orWhere(`user_keywords.value ILIKE :keyword${index}`, {
          [`keyword${index}`]: `%${keyword.trim()}%`,
        });
      });
    }

    if (dialect) {
      const keywords = (dialect as string).split(',');

      query = query.andWhere("user_keywords.key = 'dialect'");
      keywords.forEach((keyword, index) => {
        query = query.orWhere(`user_keywords.value ILIKE :keyword${index}`, {
          [`keyword${index}`]: `%${keyword.trim()}%`,
        });
      });
    }

    if (nose) {
      const keywords = (nose as string).split(',');

      query = query.andWhere("user_keywords.key = 'nose'");
      keywords.forEach((keyword, index) => {
        query = query.orWhere(`user_keywords.value ILIKE :keyword${index}`, {
          [`keyword${index}`]: `%${keyword.trim()}%`,
        });
      });
    }

    if (eye) {
      const keywords = (eye as string).split(',');

      query = query.andWhere("user_keywords.key = 'eye'");
      keywords.forEach((keyword, index) => {
        query = query.orWhere(`user_keywords.value ILIKE :keyword${index}`, {
          [`keyword${index}`]: `%${keyword.trim()}%`,
        });
      });
    }

    if (mouth) {
      const keywords = (mouth as string).split(',');

      query = query.andWhere("user_keywords.key = 'mouth'");
      keywords.forEach((keyword, index) => {
        query = query.orWhere(`user_keywords.value ILIKE :keyword${index}`, {
          [`keyword${index}`]: `%${keyword.trim()}%`,
        });
      });
    }

    query = query.andWhere('user.can_poomasi = :can_poomasi', {
      can_poomasi: can_poomasi === 'true',
    });

    if (hair_style && hair_style !== 'all') {
      const keywords = (hair_style as string).split(',');

      keywords.forEach((keyword, index) => {
        query = query.andWhere(`user_keywords.value = :keyword`, {
          keyword: hair_style,
        });
      });
    }

    const [results, total] = await query
      .select([
        'user.id',
        'user.agency',
        'user.type',
        'user.location',
        'user.name',
        'user.gender',
        'user.race',
        'user.introduction',
        'user.height',
        'user.weight',
        'user.footSize',
        'user.fee',
        'user.can_negotiate_fee',
        'user.can_poomasi',
        'user.representative_work',
        'user.filmography',
        'user.provider',
        'user.birthDate',
        'user.drivers_license',
        'user_keywords.key',
        'user_keywords.value',
        'user_keywords.created_at',
        'user.created_at',
        'user.profileImageURL',
        'user.prpfileScrollTop',
        'user.monolog_video_url',
      ])
      .orderBy('user.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    results.forEach((result) => {
      result.profileImageURL = `http://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${result.profileImageURL}`;
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
  const userRepository = dataSource.getRepository('Users');

  const notiRepo = dataSource.getRepository('Notifications');

  try {
    const result = await userRepository.findOne({
      where: { id: req.params.id },
      select: [
        'agency',
        'type',
        'location',
        'name',
        'gender',
        'race',
        'introduction',
        'height',
        'weight',
        'footSize',
        'fee',
        'can_negotiate_fee',
        'can_poomasi',
        'representative_work',
        'filmography',
        'provider',
        'birthDate',
        'drivers_license',
        'profileImageURL',
        'prpfileScrollTop',
        'monolog_video_url',
      ],
    });

    result.profileImageURL =
      `http://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/` +
      result.profileImageURL;

    if (req.session.user_id) {
      const result2 = await userRepository.findOne({
        where: { id: req.session.user_id },
        select: ['agency'],
      });

      if (
        req.params.id !== req.session.user_id.toString() &&
        result2 &&
        result2.agency
      ) {
        const result3 = await notiRepo.save({
          user_id: req.params.id,
          message: `'${result2.agency === '' ? '(알 수 없는 소속)' : result2.agency}'에서 프로필을 확인했습니다.`,
        });
      }
    }

    if (req.session.user_id && req.params.id !== req.session.user_id.toString()) {
      await dataSource.getRepository('UserVisitorLog').save({
        profile_id: req.session.user_id,
        user_id: req.params.id,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {

  const userRepository = dataSource.getRepository('Users');

  if (!req.session.email) res.status(400).json('400');

  delete req.body.keywords;
  delete req.body.socialMedias;
  delete req.body.representativeKeyword;
  delete req.body.profileImageURL;
  try {
    const result = await userRepository.update(req.session.user_id, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const userRepository = dataSource.getRepository('Users');

  if (!req.session.email) res.status(400).json('400');

  try {
    const result = await userRepository.delete({ email: req.session.email });

    req.session.destroy((err) => {
      if (err) {
        res.status(500).send('no session');
      } else {
        res.status(200).send('goodbye');
      }
    });
  } catch (error) {
    next(error);
  }
}
