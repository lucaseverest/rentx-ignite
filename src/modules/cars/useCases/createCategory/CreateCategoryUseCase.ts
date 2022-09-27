import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    // private categoriesRepository: CategoriesRepository // criação da variável
    // constructor(categoriesRespository: CategoriesRepository){
    //     this.categoriesRepository = this.categoriesRepository
    // } ou ...

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);
        if (categoryAlreadyExists) {
            throw new Error("Category already exists!");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };

// depois que passamos das rotas para o service precisamos:
// 1 - Definir o tipo de retorno, 2 - alterar o retorno de erro, 3 - acessar o repositório
// O Service n tem que conhecer a request e o que vem nela.
