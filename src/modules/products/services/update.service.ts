import { ProductsRepository } from "../repositories/products.repository";

export class UpdateProductService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    async update(id: number, payload: any): Promise<void> {
        await this.productsRepository.updateById(id, payload);
    }
}