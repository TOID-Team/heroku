import express, { Router } from 'express';

import * as controller from '../controllers/user-representative-keywords.controller';

const router: Router = express.Router();

router.route('/').post(controller.create);
router.route('/:id').get(controller.readAll);
router.route('/').delete(controller.remove);

export default router;
