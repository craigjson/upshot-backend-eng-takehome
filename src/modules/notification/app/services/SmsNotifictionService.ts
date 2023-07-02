import { Injectable } from "@nestjs/common";

@Injectable()
export class SmsNotificationService {
  sendNotification(userId: string, auctionId: string) {
    console.log(
      `Sending SMS notification to user ${userId} for auction ${auctionId}`
    );
    // Implementation for sending SMS notification goes here
  }
}
