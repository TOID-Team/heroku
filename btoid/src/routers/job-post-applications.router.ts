 import express, { Router } from 'express';

import * as controller from '../controllers/job-post-applications.controller';

const router: Router = express.Router();

router.route('/').post(controller.create);
router.route('/').get(controller.readAll);
router.route('/:id').get(controller.readOne);
router.route('/').put(controller.update);
router.route('/').delete(controller.remove);

export default router;
