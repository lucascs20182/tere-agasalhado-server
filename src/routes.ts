import { Router } from 'express';
import CollectPointsController from './controllers/CollectPointsController';

const routes = Router();

routes.post('/collectpoints', CollectPointsController.create);

export default routes;
