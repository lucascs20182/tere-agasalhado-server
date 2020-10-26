import CollectPoint from '../models/CollectPoint';
import imagesView from './images_view';

export default {
    render(collectPoint: CollectPoint) {
        return { 
            id: collectPoint.id,
            name: collectPoint.name,
            latitude: collectPoint.latitude,
            longitude: collectPoint.longitude,
            about: collectPoint.about,
            instructions: collectPoint.instructions,
            opening_hours: collectPoint.opening_hours,
            open_on_weekends: collectPoint.open_on_weekends,
            images: imagesView.renderMany(collectPoint.images)
        }
    },

    renderMany(collectPoint: CollectPoint[]) {
        return collectPoint.map(collectPoint => this.render(collectPoint));
    }
}
