import { Module } from "@nestjs/common";
import { AuctionModule } from "./modules/auction/auction.module";
import { NotificationModule } from "./modules/notification/notification.module";
import { DefaultController } from "./app.controller";

@Module({
  imports: [AuctionModule, NotificationModule],
  controllers: [DefaultController],
})
export class AppModule {}
