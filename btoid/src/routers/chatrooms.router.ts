import express, { Router } from 'express';

import * as controller from '../controllers/chatrooms.controller';

const router: Router = express.Router();

router.route('/').post(controller.create);

router.route('/:id').get(controller.readOne);

router.route('/').delete(controller.remove);

export default router;
