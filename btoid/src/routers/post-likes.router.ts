import express, { Router } from 'express';

import * as controller from '../controllers/post-likes.controller';

const router: Router = express.Router();

router.route('/').post(controller.create);

router.route('/').delete(controller.remove);

export default router;
