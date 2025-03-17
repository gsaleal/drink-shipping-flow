import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {StoresRepository} from '../modules/stores/repositories/stores.repository';

@Injectable()
export class StoreExistsGuard implements CanActivate {
    constructor(
        private readonly storesRepository: StoresRepository,
    ) {}

    async canActivate(
        context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const storeId = request.headers['x-store-id'];
        const store = await this.storesRepository.getById(storeId);

        if (!store) {
            throw new HttpException('Store not found', HttpStatus.NOT_FOUND);
        }

        return true;
    }
}
