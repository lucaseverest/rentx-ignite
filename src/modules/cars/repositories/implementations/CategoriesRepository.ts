import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

// esse postgres é um subtipo de CategoriesRepository
class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    // configurando insersão no banco
    constructor() {
        this.repository = getRepository(Category);
    }

    // // Singleton
    // public static getInstance(): CategoriesRepository {
    //     if (!CategoriesRepository.INSTANCE) {
    //         CategoriesRepository.INSTANCE = new CategoriesRepository();
    //     }
    //     return CategoriesRepository.INSTANCE;
    // }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });

        // inserir no Banco a categoria
        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        // select* from categories where name = "name" limit 1
        const category = this.repository.findOne({ name });
        return category;
    }
}

export { CategoriesRepository };
