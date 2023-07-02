import { Module } from "@nestjs/common";
import { AuctionModule } from "./modules/auction/auction.module";
import { NotificationModule } from "./modules/notification/notification.module";

@Module({
  imports: [AuctionModule, NotificationModule],
})
export class AppModule {}
