import {HttpService} from '@nestjs/axios';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {firstValueFrom} from 'rxjs';

@Injectable()
export class HeinekenRepository {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {}


    async sendOrder(payload: any): Promise<string> {
        const externalBaseUrl = this.configService.get('EXTERNAL_BASE_URL');
        const ambevSendOrderPath = this.configService.get('EXTERNAL_SEND_ORDER_PATH');

        const {data} = await firstValueFrom(this.httpService.post(
            `${externalBaseUrl}/${ambevSendOrderPath}`,
            payload
        ));

        const partnerOrderId = data.id;

        return partnerOrderId;
    }
}
