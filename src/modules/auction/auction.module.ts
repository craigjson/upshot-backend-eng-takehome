import { KafkaProducer } from "../shared/infra/messaging/KafkaProducer";
import { Module } from "@nestjs/common";
import { AuctionController } from "./app/controllers/AuctionController";
import { AuctionService } from "./app/services/AuctionService";
import { AuctionRepository } from "./infra/persistence/AuctionRepository";

@Module({
  controllers: [AuctionController],
  providers: [AuctionService, AuctionRepository, KafkaProducer],
})
export class AuctionModule {}
