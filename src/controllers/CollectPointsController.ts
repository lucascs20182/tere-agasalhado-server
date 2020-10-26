import { Request, Response } from 'express';
import { getRepository } from 'typeorm'; //repository pattern
import CollectPoints from '../models/CollectPoint';
import collectPointsView from '../views/collect_points_view';

export default {
    async index(request: Request, response: Response) {
        const collectPointsRepository = getRepository(CollectPoints);

        const collectPoints = await collectPointsRepository.find({
            relations: ['images']
        });

        return response.json(collectPointsView.renderMany(collectPoints));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const collectPointsRepository = getRepository(CollectPoints);

        const collectPoint = await collectPointsRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(collectPointsView.render(collectPoint));
    },

    async create(request: Request, response: Response) {
        const {
            name, latitude, longitude, about, instructions,
            opening_hours, open_on_weekends
        } = request.body;
    
        const collectPointsRepository = getRepository(CollectPoints);

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        })
    
        const collectPoint = collectPointsRepository.create({
            name, latitude, longitude, about, instructions,
            opening_hours, open_on_weekends, images
        });
    
        await collectPointsRepository.save(collectPoint);
    
        return response.status(201).json(collectPoint);
    }
}
