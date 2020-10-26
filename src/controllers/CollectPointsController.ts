import { Request, Response } from 'express';
import { getRepository } from 'typeorm'; //repository pattern
import CollectPoints from '../models/CollectPoint';
import collectPointsView from '../views/collect_points_view';
import * as Yup from 'yup';

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

        const data = {
            name, latitude, longitude, about, instructions,
            opening_hours, open_on_weekends, images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });

        await schema.validate(data, { abortEarly: false });
    
        const collectPoint = collectPointsRepository.create(data);
    
        await collectPointsRepository.save(collectPoint);
    
        return response.status(201).json(collectPoint);
    }
}
