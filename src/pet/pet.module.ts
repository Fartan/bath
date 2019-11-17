import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PetController } from "./pet.controller";
import { PetService } from "./pet.service";
import { Pet } from "./pet.entity";
import { PurchaseModule } from "../purchase/purchase.module";

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), PurchaseModule],
  controllers: [PetController],
  providers: [PetService],
  exports: [PetService]
})
export class PetModule { }