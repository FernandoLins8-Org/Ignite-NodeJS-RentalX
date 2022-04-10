import dayjs from 'dayjs';

import RentalsRepositoryInMemory from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/DateProvider/implementations/DayjsDateProvider';
import AppError from '@shared/errors/AppError';

import CreateRentalsUseCase from './CreateRentalsUseCase';

let rentalsRepositoriesInMemory: RentalsRepositoryInMemory;
let createRentalsUseCase: CreateRentalsUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  const tomorrowDate = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoriesInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalsUseCase = new CreateRentalsUseCase(rentalsRepositoriesInMemory, dayjsDateProvider);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalsUseCase.execute({
      user_id: '1234',
      car_id: '12345',
      expected_return_date: tomorrowDate,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    expect(async () => {
      const carId1 = '123';
      const carId2 = '321';
      const sameUserId = '1234';

      await createRentalsUseCase.execute({
        user_id: sameUserId,
        car_id: carId1,
        expected_return_date: tomorrowDate,
      });

      await createRentalsUseCase.execute({
        user_id: sameUserId,
        car_id: carId2,
        expected_return_date: tomorrowDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    expect(async () => {
      const userId1 = '123';
      const userId2 = '321';
      const sameCarId = '1234';

      await createRentalsUseCase.execute({
        user_id: userId1,
        car_id: sameCarId,
        expected_return_date: tomorrowDate,
      });

      await createRentalsUseCase.execute({
        user_id: userId2,
        car_id: sameCarId,
        expected_return_date: tomorrowDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with expected return time less than 24h', async () => {
    expect(async () => {
      await createRentalsUseCase.execute({
        user_id: '1234',
        car_id: '4321',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
