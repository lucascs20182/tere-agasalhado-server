import { Router } from 'express';
import CollectPointsController from './controllers/CollectPointsController';

const routes = Router();

routes.get('/collectpoints', CollectPointsController.index);
routes.post('/collectpoints', CollectPointsController.create);

export default routes;
