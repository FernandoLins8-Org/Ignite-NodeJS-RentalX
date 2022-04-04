import { container } from 'tsyringe';

import UsersRepository from '@modules/accounts/repositories/implementations/UsersRepository';
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository';
import ICategoriaRepository from '@modules/cars/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/cars/repositories/implementations/CategoriesRepository';
import SpecificationsRepository from '@modules/cars/repositories/implementations/SpecificationsRepository';
import ISpecificationsRepository from '@modules/cars/repositories/ISpecificationsRepository';

// ICategoriesRepository
container.registerSingleton<ICategoriaRepository>('CategoriesRepository', CategoriesRepository);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
