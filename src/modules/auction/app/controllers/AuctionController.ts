import { Controller, Post, Body } from "@nestjs/common";
import { AuctionService } from "../services/AuctionService";
import { Auction } from "../../domain/models/Auction";

@Controller("auctions") // Adjusted the route to "/auctions"
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Post()
  async createAuction(@Body() auction: Auction) {
    await this.auctionService.createAuction(auction);
    return { success: true };
  }
}
