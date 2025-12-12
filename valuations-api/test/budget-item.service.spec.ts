import { Test, TestingModule } from '@nestjs/testing';
import { BudgetItemService } from '../budget-item/budget-item.service';

describe('BudgetItemService', () => {
  let service: BudgetItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BudgetItemService],
    }).compile();

    service = module.get<BudgetItemService>(BudgetItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
