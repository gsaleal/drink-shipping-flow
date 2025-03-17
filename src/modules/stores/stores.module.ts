import { Module } from "@nestjs/common";
import { Store } from "./models/store.model";
import { StoreController } from "./stores.controller";
import { StoresRepository } from "./repositories/stores.repository";
import { ReadStoreService } from "./services/read.service";
import { CreateStoreService } from "./services/create.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UpdateStoreService } from "./services/update.service";
import { DeleteStoreService } from "./services/delete.service";

@Module({
    imports: [SequelizeModule.forFeature([Store])],
    controllers: [StoreController],
    providers: [StoresRepository, CreateStoreService, ReadStoreService, UpdateStoreService, DeleteStoreService],
    exports : [StoresRepository]
})
export class StoresModule {}