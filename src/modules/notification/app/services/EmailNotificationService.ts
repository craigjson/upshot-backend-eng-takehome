import { NFT } from "@modules/shared/domain/models/NftCollection";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailNotificationService {
  sendNotification(userId: string, auctionId: string, collection: string) {
    console.log(
      `Sending email notification to user ${userId} for auction ${auctionId} on collection ${collection}`
    );
    // Implementation for sending email notification goes here
  }
}
