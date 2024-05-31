import express, { Router } from 'express';

import * as controller from '../controllers/auth.controller';

const router: Router = express.Router();

/*router.route('/email/login').post(controller.emailLogin);
router.route('/email/verification').get(controller.emailVerify);
router.route('/email/verification').post(controller.emailConfirm);*/
router.route('/kakao/login').get(controller.kakaoLogin);
router.route('/kakao/callback').get(controller.kakaoCallback);
router.route('/naver/login').get(controller.naverLogin);
router.route('/naver/callback').get(controller.naverCallback);
router.route('/google/login').get(controller.googleLogin);
router.route('/google/callback').get(controller.googleCallback);
router.route('/readmyid').get(controller.readMyID);
router.route('/logout').get(controller.logout);
export default router;

