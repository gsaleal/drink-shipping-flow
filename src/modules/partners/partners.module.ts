import {Module} from '@nestjs/common';
import {HeinekenRepository} from './repositories/external.repository';
import {AdaptOrderServiceService} from './services/adapt-order-service.service';
import {HttpModule} from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [HeinekenRepository, AdaptOrderServiceService],
    exports: [HeinekenRepository, AdaptOrderServiceService],
})
export class PartnersModule {}
