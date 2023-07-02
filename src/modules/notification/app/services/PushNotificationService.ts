import { Injectable } from "@nestjs/common";

@Injectable()
export class PushNotificationService {
  sendNotification(userId: string, auctionId: string) {
    console.log(
      `Sending push notification to user ${userId} for auction ${auctionId}`
    );
    // Implementation for sending push notification goes here
  }
}
