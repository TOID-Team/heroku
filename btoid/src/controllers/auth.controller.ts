import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import session from 'express-session';
import { dataSource } from '../configs/typeorm';
import { simpleEmailService } from '../utils/ses';
import { redisClient } from '../configs/redis';
import { v4 as uuidv4 } from 'uuid';
const domain = process.env.DOMAIN;

export async function readMyID(
  req: Request,
  res: Response,
  next: NextFunction,
) {

  const userRepository = dataSource.getRepository('Users');
  if (req.session.user_id) {
    try {
      const result = await userRepository.findOne({
        where: { email: req.session.email 
        
        },
        select:['id','name','provider']
      });
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json('404');
      }
    } catch (error) {
      next(error);
    }
  } else {
    res.status(404).json('404');
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  req.session.destroy((err) => {
    if (err) {

      res.status(500).send('not loged in');
    } else {
      return res.redirect('/');
    }
  });

}

export async function kakaoLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const redirectUri = `http://${domain}/api/auth/kakao/callback`;
    const clientId = process.env.KAKAO_CLIENT_ID;

    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    return res.redirect(kakaoAuthURL);
  } catch (error) {
    next(error);
  }
}

export async function kakaoCallback(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userRepository = dataSource.getRepository('Users');


  try {
    const { code } = req.query;
    const secret = process.env.KAKAO_CLIENT_SECRET;
    const response = await axios({
      method: 'POST',
      url: `https://kauth.kakao.com/oauth/token?client_secret=${secret}`,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENT_ID,
        redirect_uri: `http://${domain}/api/auth/kakao/callback`,
        code: code,
      },
    });
    
    const { access_token } = response.data;

    const userResponse = await axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const email: string = userResponse.data.kakao_account.email;
    const user = await userRepository.findOne({ where: { email } });

    if (user) {
      if (user.provider !== 'kakao') {
        return res.status(400).json({ isRightSNSMetherd: false });
      }

      req.session.email = email;
      req.session.user_id = user.id;
      res.redirect('/'); 
      return res.status(200).json({ isExistUser: true });
    } else {

      return CreateAccount(email, uuidv4(), 'kakao', req, res);
    }
  } catch (error) {
    next(error);
  }
}

export async function naverLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const state = 'RANDOM_STATE'; 
    const redirectURI = encodeURI(`http://${domain}/api/auth/naver/callback`);
    const CLIENT_ID = process.env.NAVER_CLIENT_ID;

    const naverAuthURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${redirectURI}&state=${state}`;

    res.redirect(naverAuthURL);
  } catch (error) {
    next(error);
  }
}

export async function naverCallback(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userRepository = dataSource.getRepository('Users');

  const { code, state } = req.query;
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;
  const redirectUri = `http://${domain}/api/auth/naver/callback`;

  try {
    const tokenResponse = await axios.post(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&code=${code}&state=${state}`,
    );
    const { access_token } = tokenResponse.data;

    const profileResponse = await axios.get(
      'https://openapi.naver.com/v1/nid/me',
      {
        headers: { Authorization: `Bearer ${access_token}` },
      },
    );

    const userProfile = profileResponse.data;
    const email = userProfile.response.email;

    const user = await userRepository.findOne({ where: { email } });

    if (user) {

      if (user.provider !== 'naver') {
        return res.status(400).json({ isRightSNSMetherd: false });
      }

      req.session.email = email; 
      req.session.user_id = user.id;
      res.redirect('/'); 
      return res.status(200).json({ isExistUser: true });
    } else {

      return CreateAccount(email, uuidv4(), 'naver', req, res);
    }
  } catch (error) {
    next(error);
  }
}

export async function googleLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const redirectUri = `http://${domain}/api/auth/google/callback`;
    const clientId = process.env.GOOGLE_CLIENT_ID;

    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20profile%20email`;

    res.redirect(googleAuthURL);
  } catch (error) {
    next(error);
  }
}

export async function googleCallback(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const userRepository = dataSource.getRepository('Users');


  const { code } = req.query;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = `http://${domain}/api/auth/google/callback`;

  try {
    const tokenResponse = await axios.post(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&grant_type=authorization_code`,
    );
    const { access_token } = tokenResponse.data;

    const profileResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        headers: { Authorization: `Bearer ${access_token}` },
      },
    );
    const userProfile = profileResponse.data;

    const email = userProfile.email;
    const user = await userRepository.findOne({ where: { email } });

    if (user) 
    {

      if (user.provider !== 'google') {
        return res.status(400).json({ isRightSNSMetherd: false });
      }
   
      req.session.email = email; 
      req.session.user_id = user.id;
      res.redirect('/'); 
      return res.status(200).json({ isExistUser: true });
    } else {
      return CreateAccount(email, uuidv4(), 'google', req, res);
    }
  } catch (error) {
    next(error);
  }
}

async function CreateAccount(
  email: string,
  password: string,
  snsType: string,
  req: Request,
  res: Response,
) 
{
  const userRepository = dataSource.getRepository('Users');

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userRepository.save({
      email: email,
      password: hashedPassword,
      provider: snsType,
    });
    req.session.email = email;
    req.session.user_id = result.user_id;
    res.redirect('/'); 
    res.status(201).json({created:true});

  } catch (error) {

    res.status(400).json('400');
  }
}
