import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailNotificationService {
  sendNotification(userId: string, auctionId: string) {
    console.log(
      `Sending email notification to user ${userId} for auction ${auctionId}`
    );
    // Implementation for sending email notification goes here
  }
}
