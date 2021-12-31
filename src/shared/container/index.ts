import { container } from 'tsyringe';

import ICategoriaRepository from '../../modules/cars/repositories/ICategoriesRepository';
import CategoriesRepository from '../../modules/cars/repositories/implementations/CategoriesRepository';

// ICategoriesRepository
container.registerSingleton<ICategoriaRepository>('CategoriesRepository', CategoriesRepository);
