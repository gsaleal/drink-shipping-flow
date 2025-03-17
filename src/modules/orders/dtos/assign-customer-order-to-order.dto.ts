export class AssignCustomerOrderToOrderInputDto {
    id: number;
    storeId: number;
    customerId: number;
    totalPrice: number;
    totalItems: number;
    orderedAt: Date;
    products: Array<{
        id: number;
        sku: string;
        name: string;
        price: number;
        quantity: number;
    }>;

    constructor(properties: AssignCustomerOrderToOrderInputDto) {
        Object.assign(this, properties);
    }
}
