import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import SpecificationsRepositoryInMemory from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import AppError from '@shared/errors/AppError';

import CreateCarUseCase from '../createCar/CreateCarUseCase';
import CreateCarSpecificationUseCase from './CreateCarSpecificationUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let createCarUseCase: CreateCarUseCase;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to add a new specification to a car', async () => {
    const carInfo = {
      name: 'Nissan 350Z',
      description: '',
      daily_rate: 300,
      license_plate: 'ABC-3500',
      fine_amount: 100,
      brand: 'Nissan',
      category_id: 'category',
    };
    await createCarUseCase.execute(carInfo);
    const car = await carsRepositoryInMemory.findByLicensePlate(carInfo.license_plate);

    await specificationsRepositoryInMemory.create({
      name: 'teste',
      description: 'test',
    });
    const specification = await specificationsRepositoryInMemory.findByName('teste');

    const carSpecifications = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_ids: [specification.id],
    });

    expect(carSpecifications).toHaveProperty('specifications');
    expect(carSpecifications.specifications.length).toBe(1);
  });

  it('should not be able to add a new specification to a non existing car', async () => {
    const fakeCarId = '1234';

    await specificationsRepositoryInMemory.create({
      name: 'teste',
      description: 'test',
    });
    const specification = await specificationsRepositoryInMemory.findByName('teste');

    await expect(
      createCarSpecificationUseCase.execute({
        car_id: fakeCarId,
        specifications_ids: [specification.id],
      }),
    ).rejects.toEqual(new AppError('Car does not exist'));
  });

  it('should not be able to add a non existing specification to a car', async () => {
    const carInfo = {
      name: 'Nissan 350Z',
      description: '',
      daily_rate: 300,
      license_plate: 'ABC-3500',
      fine_amount: 100,
      brand: 'Nissan',
      category_id: 'category',
    };
    await createCarUseCase.execute(carInfo);
    const car = await carsRepositoryInMemory.findByLicensePlate(carInfo.license_plate);

    const fakeSpecIds = ['5678', '12345'];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id: car.id,
        specifications_ids: fakeSpecIds,
      }),
    ).rejects.toEqual(new AppError('Specifications not found'));
  });
});
