import { parse as csvParse } from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import CategoriesRepository from '@modules/cars/repositories/implementations/CategoriesRepository';

interface IImportCategory {
  name: string
  description: string
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) {}

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = csvParse();
      stream.pipe(parseFile);

      parseFile.on('data', async (line) => {
        const [name, description] = line;
        categories.push({
          name,
          description,
        });
      })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;
      const categoryExists = await this.categoriesRepository.findByName(name);

      if (!categoryExists) {
        this.categoriesRepository.create({
          name,
          description,
        });
      }
    });

    return categories;
  }
}

export default ImportCategoriesUseCase;
