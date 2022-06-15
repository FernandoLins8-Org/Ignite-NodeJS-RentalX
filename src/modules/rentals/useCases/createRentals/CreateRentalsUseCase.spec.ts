import dayjs from 'dayjs';

import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import RentalsRepositoryInMemory from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/DateProvider/implementations/DayjsDateProvider';
import AppError from '@shared/errors/AppError';

import CreateRentalsUseCase from './CreateRentalsUseCase';

let rentalsRepositoriesInMemory: RentalsRepositoryInMemory;
let createRentalsUseCase: CreateRentalsUseCase;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Rental', () => {
  const tomorrowDate = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoriesInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    createRentalsUseCase = new CreateRentalsUseCase(
      rentalsRepositoriesInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a new rental', async () => {
    await carsRepositoryInMemory.create({
      name: 'Test car',
      description: 'Test car',
      daily_rate: 100,
      license_plate: 'test license_plate',
      fine_amount: 40,
      category_id: '1234',
      brand: 'test brand',
    });

    const car = await carsRepositoryInMemory.findByLicensePlate('test license_plate');

    const rental = await createRentalsUseCase.execute({
      user_id: '1234',
      car_id: car.id,
      expected_return_date: tomorrowDate,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    const sameUserId = '1234';

    const car1 = await carsRepositoryInMemory.create({
      id: '12345',
      name: 'Test car 1',
      description: 'test',
      daily_rate: 100,
      license_plate: '12345',
      fine_amount: 100,
      brand: 'test brand',
      category_id: 'test',
    });

    const car2 = await carsRepositoryInMemory.create({
      id: '123456',
      name: 'Test car 2',
      description: 'test',
      daily_rate: 100,
      license_plate: '123456',
      fine_amount: 100,
      brand: 'test brand',
      category_id: 'test',
    });

    await createRentalsUseCase.execute({
      user_id: sameUserId,
      car_id: car1.id,
      expected_return_date: tomorrowDate,
    });

    await expect(async () => {
      await createRentalsUseCase.execute({
        user_id: sameUserId,
        car_id: car2.id,
        expected_return_date: tomorrowDate,
      });
    }).rejects.toEqual(new AppError('There is a rental open to the user already'));
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    const userId1 = '123';
    const userId2 = '321';

    const car1 = await carsRepositoryInMemory.create({
      id: '2345',
      name: 'Test car 1',
      description: 'test',
      daily_rate: 100,
      license_plate: '12345',
      fine_amount: 100,
      brand: 'test brand',
      category_id: 'test',
    });

    await createRentalsUseCase.execute({
      user_id: userId1,
      car_id: car1.id,
      expected_return_date: tomorrowDate,
    });

    await expect(
      createRentalsUseCase.execute({
        user_id: userId2,
        car_id: car1.id,
        expected_return_date: tomorrowDate,
      }),
    ).rejects.toEqual(new AppError('Car is not available'));
  });

  it('should not be able to create a new rental with expected return time less than 24h', async () => {
    await expect(
      createRentalsUseCase.execute({
        user_id: '1234',
        car_id: '4321',
        expected_return_date: new Date(),
      }),
    ).rejects.toEqual(new AppError('Rental minimum time is 24h'));
  });
});
