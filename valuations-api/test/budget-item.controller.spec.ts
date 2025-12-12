import { Test, TestingModule } from '@nestjs/testing';
import { BudgetItemController } from './budget-item.controller';
import { BudgetItemService } from './budget-item.service';

describe('BudgetItemController', () => {
  let controller: BudgetItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BudgetItemController],
      providers: [BudgetItemService],
    }).compile();

    controller = module.get<BudgetItemController>(BudgetItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
