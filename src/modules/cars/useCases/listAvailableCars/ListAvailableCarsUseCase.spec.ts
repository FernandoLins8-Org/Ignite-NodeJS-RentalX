import CarsRepositoryInMemory from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import CreateCarUseCase from '../createCar/CreateCarUseCase';
import ListAvailableCarsUseCase from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let createCarUseCase: CreateCarUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all cars', async () => {
    const availableCarInfo = {
      name: 'Test car',
      description: 'Description',
      daily_rate: 100,
      license_plate: 'ABC-5678',
      fine_amount: 60,
      brand: 'Test Brand',
      category_id: 'category',
    };

    await createCarUseCase.execute(availableCarInfo);
    const availableCar = await carsRepositoryInMemory
      .findByLicensePlate(availableCarInfo.license_plate);

    const unavailableCarInfo = {
      name: 'Test car 2',
      description: 'Description 2',
      daily_rate: 200,
      license_plate: 'ABC-1234',
      fine_amount: 70,
      brand: 'Test Brand',
      category_id: 'category',
    };

    await createCarUseCase.execute(unavailableCarInfo);
    const unavailableCar = await carsRepositoryInMemory
      .findByLicensePlate(unavailableCarInfo.license_plate);
    unavailableCar.available = false;

    const availableCars = await listAvailableCarsUseCase.execute({});

    expect(availableCars).toContain(availableCar);
    expect(availableCar).not.toContain(unavailableCar);
  });

  it('should be able to list all available cars by name', async () => {
    const toBeFoundCarInfo = {
      name: 'Nissan 350Z',
      description: '',
      daily_rate: 300,
      license_plate: 'ABC-3500',
      fine_amount: 100,
      brand: 'Nissan',
      category_id: 'category',
    };

    const notToBeFoundCarInfo = {
      name: 'Test car 2',
      description: 'Description 2',
      daily_rate: 200,
      license_plate: 'ABC-1234',
      fine_amount: 70,
      brand: 'Test Brand',
      category_id: 'category',
    };

    await createCarUseCase.execute(toBeFoundCarInfo);
    const toBeFoundCar = await carsRepositoryInMemory
      .findByLicensePlate(toBeFoundCarInfo.license_plate);

    await createCarUseCase.execute(notToBeFoundCarInfo);
    const notToBeFoundCar = await carsRepositoryInMemory
      .findByLicensePlate(notToBeFoundCarInfo.license_plate);

    const availableCarsFound = await listAvailableCarsUseCase.execute({
      name: 'Nissan 350Z',
    });

    expect(availableCarsFound).toContain(toBeFoundCar);
    expect(availableCarsFound).not.toContain(notToBeFoundCar);
  });

  it('should be able to list all available cars by brand', async () => {
    const notToBeFoundCarInfo = {
      name: 'Nissan 350Z',
      description: '',
      daily_rate: 300,
      license_plate: 'ABC-3555',
      fine_amount: 100,
      brand: 'Nissan',
      category_id: 'category',
    };

    const toBeFoundCarInfo = {
      name: 'Audi A3',
      description: '',
      daily_rate: 200,
      license_plate: 'ABC-3333',
      fine_amount: 70,
      brand: 'Audi',
      category_id: 'category',
    };

    await createCarUseCase.execute(notToBeFoundCarInfo);
    const notToBeFoundCar = await carsRepositoryInMemory
      .findByLicensePlate(notToBeFoundCarInfo.license_plate);

    await createCarUseCase.execute(toBeFoundCarInfo);
    const toBeFoundCar = await carsRepositoryInMemory
      .findByLicensePlate(toBeFoundCarInfo.license_plate);

    const availableCarsFound = await listAvailableCarsUseCase.execute({
      brand: 'Audi',
    });

    expect(availableCarsFound).not.toContain(notToBeFoundCar);
    expect(availableCarsFound).toContain(toBeFoundCar);
  });

  it('should be able to list all available cars by category', async () => {
    const toBeFoundCarInfo1 = {
      name: 'Nissan 350Z',
      description: '',
      daily_rate: 300,
      license_plate: 'ABC-3555',
      fine_amount: 100,
      brand: 'Nissan',
      category_id: 'hatch',
    };

    const toBeFoundCarInfo2 = {
      name: 'Audi A3',
      description: '',
      daily_rate: 200,
      license_plate: 'ABC-3333',
      fine_amount: 70,
      brand: 'Audi',
      category_id: 'hatch',
    };

    const notToBeFoundCarInfo = {
      name: 'Test Car',
      description: '',
      daily_rate: 100,
      license_plate: 'DEF-4444',
      fine_amount: 100,
      brand: 'test',
      category_id: 'category',
    };

    await createCarUseCase.execute(toBeFoundCarInfo1);
    const toBeFoundCar1 = await carsRepositoryInMemory
      .findByLicensePlate(toBeFoundCarInfo1.license_plate);

    await createCarUseCase.execute(toBeFoundCarInfo2);
    const toBeFoundCar2 = await carsRepositoryInMemory
      .findByLicensePlate(toBeFoundCarInfo2.license_plate);

    await createCarUseCase.execute(notToBeFoundCarInfo);
    const notToBeFoundCar = await carsRepositoryInMemory
      .findByLicensePlate(notToBeFoundCarInfo.license_plate);

    const availableCarsFound = await listAvailableCarsUseCase.execute({
      category_id: 'hatch',
    });

    expect(availableCarsFound).toContain(toBeFoundCar1);
    expect(availableCarsFound).toContain(toBeFoundCar2);
    expect(availableCarsFound).not.toContain(notToBeFoundCar);
  });
});
