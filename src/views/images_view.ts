import Image from '../models/Image';

export default {
    render(image: Image) {
        return { 
            id: image.id,

            //find a way to handle either dev as production
            url: `http://localhost:3333/uploads/${image.path}`
        }
    },

    renderMany(images: Image[]) {
        return images.map(image => this.render(image));
    }
}
