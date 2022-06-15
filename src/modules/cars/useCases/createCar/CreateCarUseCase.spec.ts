import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateCarUseCase from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const carInfo = {
      name: 'Test car',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Test Brand',
      category_id: 'category',
    };

    await createCarUseCase.execute({
      name: carInfo.name,
      description: carInfo.description,
      daily_rate: carInfo.daily_rate,
      license_plate: carInfo.license_plate,
      fine_amount: carInfo.fine_amount,
      brand: carInfo.brand,
      category_id: carInfo.category_id,
    });

    const car = await carsRepositoryInMemory.findByLicensePlate(carInfo.license_plate);

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with existing license plate', async () => {
    await createCarUseCase.execute({
      name: 'Test car',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Test Brand',
      category_id: 'category',
    });

    await expect(
      createCarUseCase.execute({
        name: 'Test car 2',
        description: 'Description 2',
        daily_rate: 200,
        license_plate: 'ABC-1234',
        fine_amount: 70,
        brand: 'Test Brand',
        category_id: 'category',
      }),
    ).rejects.toEqual(new AppError('Car already exists'));
  });

  it('should create a new car as available by default', async () => {
    const carInfo = {
      name: 'Test car',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Test Brand',
      category_id: 'category',
    };

    await createCarUseCase.execute({
      name: carInfo.name,
      description: carInfo.description,
      daily_rate: carInfo.daily_rate,
      license_plate: carInfo.license_plate,
      fine_amount: carInfo.fine_amount,
      brand: carInfo.brand,
      category_id: carInfo.category_id,
    });

    const registeredCar = await carsRepositoryInMemory.findByLicensePlate(carInfo.license_plate);

    expect(registeredCar.available).toBe(true);
  });
});
