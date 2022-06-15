import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import Car from '@modules/cars/infra/typeorm/entities/Car';

import ICarsRepository from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO) {
    const car = new Car();

    Object.assign(car, {
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      available: true,
    });

    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]> {
    let availableCars: Car[];

    // Retorna listagem de carros disponíveis filtrada por category_id, brand ou name
    // Ou todos os carros disponíveis caso nenhum filtro informado
    if (category_id || brand || name) {
      availableCars = this.cars.filter((car) => {
        if (car.available && (
          (brand && car.brand === brand)
          || (category_id && car.category_id === category_id)
          || (name && car.name === name))) {
          return true;
        }
        return false;
      });
    } else {
      availableCars = this.cars.filter((car) => car.available);
    }

    return availableCars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[carIndex].available = available;
  }
}

export default CarsRepositoryInMemory;
