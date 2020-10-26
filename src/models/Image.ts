import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import CollectPoint from './CollectPoint';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => CollectPoint, collectPoint => collectPoint.images)
    @JoinColumn({ name: 'collect_point_id'})
    collect_point: CollectPoint;
}
