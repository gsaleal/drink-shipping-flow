export class sendOrderToPartnerInputDto {
    orderId: number;

    constructor(properties: sendOrderToPartnerInputDto) {
        Object.assign(this, properties);
    }
}
