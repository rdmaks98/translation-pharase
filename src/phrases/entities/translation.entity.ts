import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Phrase } from './pharse.entity';


@Entity({ name: 'translations' })
export class Translation {
@PrimaryGeneratedColumn()
id!: number;

@Column({ type: 'varchar', length: 10 })
language!: string;

@Column({ type: 'text' })
text!: string;

@Column()
phraseId!: number;

@ManyToOne(() => Phrase, (p) => p.translations, { onDelete: 'CASCADE' })
@JoinColumn({ name: 'phraseId' })
phrase!: Phrase;
}