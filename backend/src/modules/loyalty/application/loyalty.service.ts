import { BadRequestException, Inject } from '@nestjs/common';
import type { LoyaltyRepository } from '../domain/loyalty.repository';

export class LoyaltyService {

  private readonly EARN_RATE = 0.1;

  constructor(
    @Inject('LoyaltyRepository')
    private readonly repository: LoyaltyRepository
  ) {}

  async get(customerId: string) {
    return this.repository.findByCustomer(customerId);
  }

  async accumulate(customerId: string, amount: number): Promise<void> {
    if (!Number.isInteger(amount) || amount <= 0) {
      throw new BadRequestException('Loyalty points to accumulate must be a positive integer');
    }

    const account = await this.repository.findByCustomer(customerId);
    account.addPoints(amount);
    await this.repository.save(account);
  }

  async redeem(customerId: string, points: number): Promise<void> {
    if (!Number.isInteger(points) || points <= 0) {
      throw new BadRequestException('Loyalty points to redeem must be a positive integer');
    }

    const account = await this.repository.findByCustomer(customerId);
    try {
      account.subtractPoints(points);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'Insufficient loyalty points') {
        throw new BadRequestException('Insufficient loyalty points');
      }
      throw error;
    }
    await this.repository.save(account);
  }

  async adjust(customerId: string, points: number) {
    if (!Number.isInteger(points) || points === 0) {
      throw new BadRequestException('Loyalty adjustment must be a non-zero integer');
    }

    const account = await this.repository.findByCustomer(customerId);

    try {
      if (points > 0) {
        account.addPoints(points);
      } else {
        account.subtractPoints(Math.abs(points));
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'Insufficient loyalty points') {
        throw new BadRequestException('Insufficient loyalty points');
      }
      throw error;
    }

    await this.repository.save(account);
    return account;
  }

  calculatePointsEarned(totalPaid: number): number {
    return Math.floor(totalPaid * this.EARN_RATE);
  }
}
