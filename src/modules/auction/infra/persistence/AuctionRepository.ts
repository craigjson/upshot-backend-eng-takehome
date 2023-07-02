import { Injectable } from "@nestjs/common";
import { Auction } from "../../domain/models/Auction";

@Injectable()
export class AuctionRepository {
  private auctions: Auction[] = [];

  save(auction: Auction): void {
    this.auctions.push(auction);
  }
}
