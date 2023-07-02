import { EmailNotificationService } from "../../app/services/EmailNotificationService";
import { SmsNotificationService } from "../../app/services/SmsNotifictionService";
import { PushNotificationService } from "../../app/services/PushNotificationService";
import { NotificationType } from "../../../shared/domain/models/NotificationType";
import { NotifyUserEvent } from "../events/NotifyUserEvent";
import { Injectable } from "@nestjs/common";
import { KafkaConsumer } from "../../infra/messaging/KafkaConsumer";
import { UserService } from "../../../shared/app/services/UserService";

@Injectable()
export class NotifyUserHandler {
  constructor(
    private readonly emailNotificationService: EmailNotificationService,
    private readonly pushNotificationService: PushNotificationService,
    private readonly smsNotificationService: SmsNotificationService,
    private readonly userService: UserService,
    private readonly consumer: KafkaConsumer
  ) {
    this.consumer.subscribe("NotifyUserEvent", this.handleEvent.bind(this));
  }

  handleEvent(message: NotifyUserEvent) {
    const { userId, auctionId } = message;
    if (userId == null) {
      return;
    }
    console.log("Found Event: NotifyUserEvent");
    console.log(`User id: ${userId}`);
    const user = this.userService.findById(userId);
    if (user == null) {
      console.log(`User with id ${userId} not found`);
      return;
    }
    // Iterate over user notification preferences and send notifications to appropriate services
    user.notificationPreferences.forEach((preference) => {
      switch (preference) {
        case NotificationType.Email:
          this.emailNotificationService.sendNotification(user.id, auctionId);
          break;
        case NotificationType.InApp:
          this.pushNotificationService.sendNotification(user.id, auctionId);
          break;
        case NotificationType.SMS:
          this.smsNotificationService.sendNotification(user.id, auctionId);
          break;
        default:
          console.log(`Unsupported notification type: ${preference}`);
          break;
      }
    });
  }
}
