import {Expose, Type} from 'class-transformer';
import {IsDefined} from 'class-validator';

export class StoreHeaderDto {
  @IsDefined()
  @Expose({name: 'x-store-id'})
  @Type(() => Number)
  'x-store-id': number;
}
