import { ProductsRepository } from "../repositories/products.repository";

export class DeleteProductService {
    constructor(
        private readonly productsRepository: ProductsRepository
    ) {}

    async delete(id: number): Promise<void> {
        await this.productsRepository.deleteById(id);
    }

}