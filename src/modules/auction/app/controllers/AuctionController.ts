import { Controller, Post, Body } from "@nestjs/common";
import { AuctionService } from "../services/AuctionService";
import { Auction } from "../../domain/models/Auction";

@Controller("auctions") // Adjusted the route to "/auctions"
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @Post()
  async createAuction(@Body() auction: Auction) {
    this.auctionService.createAuction(auction);
    console.log(auction);
    return { success: true };
  }
}
