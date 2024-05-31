import express, { Router } from 'express';

import * as controller from '../controllers/user-sns.controller';

const router: Router = express.Router();

router.route('/').post(controller.create);
router.route('/:id').get(controller.readAll);

router.route('/').put(controller.update);
router.route('/').delete(controller.remove);

export default router;
