export class SendOrderInputDto {
    orderId: number;
    storeId: number;
    totalItems: number;
    totalPrice: number;
    products: Array<SendOrderProductInputDto>;

    constructor(properties: SendOrderInputDto) {
        Object.assign(this, properties);
    }
}

export class SendOrderProductInputDto {
    sku: string;
    quantity: number;
}
