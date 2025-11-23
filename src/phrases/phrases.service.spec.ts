import { Test, TestingModule } from '@nestjs/testing';
import { PhraseService } from './phrases.service';

// Mock repository
const mockPhraseRepository = {
  createQueryBuilder: jest.fn().mockReturnValue({
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([{ id: 1, phrase: "Hi, I'm a phrase", status: 'active', translations: [] }]),
  }),
  findOne: jest.fn().mockResolvedValue({ id: 1, phrase: "Hi, I'm a phrase", status: 'active', translations: [] }),
};

describe('PhraseService', () => {
  let service: PhraseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhraseService,
        { provide: 'PhraseRepository', useValue: mockPhraseRepository },
      ],
    }).compile();

    service = module.get<PhraseService>(PhraseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should search phrase by text', async () => {
    const result = await service.search({ query: 'Hi' });
    expect(result).toHaveLength(1);
    expect(result[0].phrase).toBe("Hi, I'm a phrase");
  });

  it('should return phrase by id', async () => {
    const result = await service.findById(1);
    expect(result.phrase).toBe("Hi, I'm a phrase");
  });
});
