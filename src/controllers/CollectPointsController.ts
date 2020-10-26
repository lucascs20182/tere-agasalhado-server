import { Request, Response } from 'express';
import { getRepository } from 'typeorm'; //repository pattern
import CollectPoints from '../models/CollectPoints';

export default {
    async index(request: Request, response: Response) {
        const collectPointsRepository = getRepository(CollectPoints);

        const collectPoints = await collectPointsRepository.find();

        return response.json(collectPoints);
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const collectPointsRepository = getRepository(CollectPoints);

        const collectPoint = await collectPointsRepository.findOneOrFail(id);

        return response.json(collectPoint);
    },

    async create(request: Request, response: Response) {
        const {
            name, latitude, longitude, about, instructions,
            opening_hours, open_on_weekends
        } = request.body;
    
        const collectPointsRepository = getRepository(CollectPoints);
    
        const collectPoint = collectPointsRepository.create({
            name, latitude, longitude, about, instructions,
            opening_hours, open_on_weekends
        });
    
        await collectPointsRepository.save(collectPoint);
    
        return response.status(201).json(collectPoint);
    }
}
