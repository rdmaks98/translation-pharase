import { Test, TestingModule } from '@nestjs/testing';
import { PhraseController } from './phrases.controller';
import { PhraseService } from './phrases.service';

describe('PhraseController', () => {
  let controller: PhraseController;

  const mockService = {
    search: jest.fn().mockResolvedValue([{ id: 1, phrase: "Hi, I'm a phrase" }]),
    getById: jest.fn().mockResolvedValue({ id: 1, phrase: "Hi, I'm a phrase" }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhraseController],
      providers: [{ provide: PhraseService, useValue: mockService }],
    }).compile();

    controller = module.get<PhraseController>(PhraseController);
  });

  it('should return searched phrase array', async () => {
    const result = await controller.search({ query: 'Hi' });
    expect(result.data).toHaveLength(1);
    expect(result.data![0].phrase).toBe("Hi, I'm a phrase");
  });

  it('should return phrase by id', async () => {
    const result = await controller.getPhrase(1);
    expect(result.data!.phrase).toBe("Hi, I'm a phrase");
  });
});
