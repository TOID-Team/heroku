import express, { Router } from 'express';

import * as controller from '../controllers/job-post-application-works.controller';

const router: Router = express.Router();

router.route('/').post(controller.create);
router.route('/').get(controller.readAll);

router.route('/').delete(controller.remove);

export default router;
