import { Injectable } from "@nestjs/common";
import { Auction } from "../../domain/models/Auction";
import { AuctionRepository } from "../../infra/persistence/AuctionRepository";
import { KafkaProducer } from "../../../shared/infra/messaging/KafkaProducer";

@Injectable()
export class AuctionService {
  constructor(
    private auctionRepository: AuctionRepository,
    private producer: KafkaProducer
  ) {}

  createAuction(auction: Auction): void {
    this.auctionRepository.save(auction);

    this.producer.publish("AuctionCreatedEvent", {
      auctionId: auction.id,
      nftCollection: auction.nftCollection,
    });
    console.log("AuctionCreatedEvent published!");
  }
}
