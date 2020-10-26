import { Router } from 'express';
import CollectPointsController from './controllers/CollectPointsController';

const routes = Router();

routes.get('/collectpoints', CollectPointsController.index);
routes.get('/collectpoints/:id', CollectPointsController.show);
routes.post('/collectpoints', CollectPointsController.create);

export default routes;
