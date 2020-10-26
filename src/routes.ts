import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import CollectPointsController from './controllers/CollectPointsController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/collectpoints', CollectPointsController.index);
routes.get('/collectpoints/:id', CollectPointsController.show);
routes.post('/collectpoints', upload.array('images'), CollectPointsController.create);

export default routes;
