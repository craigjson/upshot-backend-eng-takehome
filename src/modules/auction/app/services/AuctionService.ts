import { Injectable } from "@nestjs/common";
import { Auction } from "../../domain/models/Auction";
import { AuctionRepository } from "../../infra/persistence/AuctionRepository";
import { KafkaProducer } from "../../../shared/infra/messaging/KafkaProducer";
import { AuctionCreatedEvent } from "../../../shared/domain/events/AuctionCreatedEvent";

@Injectable()
export class AuctionService {
  constructor(
    private auctionRepository: AuctionRepository,
    private producer: KafkaProducer
  ) {}

  async createAuction(auction: Auction): Promise<void> {
    this.auctionRepository.save(auction);

    await this.producer.publish(
      "AuctionCreatedEvent",
      new AuctionCreatedEvent(auction.id, auction.nftCollection)
    );
    console.log("AuctionCreatedEvent published!");
  }
}
