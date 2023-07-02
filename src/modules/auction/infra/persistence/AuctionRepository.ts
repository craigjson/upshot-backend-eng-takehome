import { Auction } from "../../domain/models/Auction";

export class AuctionRepository {
  private auctions: Auction[] = [];

  save(auction: Auction): void {
    this.auctions.push(auction);
  }
}
