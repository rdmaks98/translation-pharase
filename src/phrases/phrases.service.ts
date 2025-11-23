import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Phrase } from './entities/pharse.entity';
import { Translation } from './entities/translation.entity';
import { Repository } from 'typeorm';
import { SearchPhraseDto } from './dto/phrases.dto';

@Injectable()
export class PhraseService {
    constructor(
        @InjectRepository(Phrase) private phraseRepo: Repository<Phrase>,
        @InjectRepository(Translation) private transRepo: Repository<Translation>,
    ) { }

    async findById(id: number): Promise<Phrase> {
        const phrase = await this.phraseRepo.findOne({ where: { id } });
        if (!phrase) throw new NotFoundException('Phrase not found');
        return phrase;
    }

    async findTranslation(id: number, lang: string): Promise<Translation> {
        const tr = await this.transRepo.findOne({ where: { phraseId: id, language: lang } });
        if (!tr) throw new NotFoundException('Translation not found');
        return tr;
    }

    async search(dto: SearchPhraseDto): Promise<Phrase[]> {
  const { query, sort = 'createdAt', sortOrder = 'asc', status } = dto;

  // Validate sortOrder
  const order = sortOrder.toUpperCase();
  if (!['ASC', 'DESC'].includes(order)) {
    throw new BadRequestException('sortOrder must be "asc" or "desc"');
  }

  const qb = this.phraseRepo.createQueryBuilder('p');

  if (query) {
    qb.where('p.phrase ILIKE :q', { q: `%${query}%` });
  }

  if (status) {
    if (query) {
      qb.andWhere('p.status = :status', { status });
    }
  }

  // Use the `sort` field for column name
  qb.orderBy(`p.${sort}`, order as 'ASC' | 'DESC');

  return qb.getMany();
}
}
