import {
Entity,
PrimaryGeneratedColumn,
Column,
OneToMany,
CreateDateColumn,
UpdateDateColumn,
Index,
} from 'typeorm';
import { Translation } from './translation.entity';


@Entity({ name: 'phrases' })
export class Phrase {
@PrimaryGeneratedColumn()
id!: number;


@Column({ type: 'text' })
@Index()
phrase!: string;


@Column({ type: 'varchar', length: 20, default: 'active' })
status!: string;


@CreateDateColumn({ type: 'timestamptz' })
createdAt!: Date;


@UpdateDateColumn({ type: 'timestamptz' })
updatedAt!: Date;


@OneToMany(() => Translation, (t) => t.phrase, { cascade: true })
translations!: Translation[];
}