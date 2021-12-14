import Category from '../model/Category';

// DTO =>Data Transfer Object
interface ICreateCategoryDTO {
  name: string
  description: string
}

class CategoriesRepository {
  private categories: Array<Category>;

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO) {
    const newCategory = new Category();
    Object.assign(newCategory, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(newCategory);
  }

  list() {
    return this.categories;
  }

  findByName(name: string) {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export default CategoriesRepository;
