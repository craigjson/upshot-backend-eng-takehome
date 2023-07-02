import { EmailNotificationService } from "@modules/notification/app/services/EmailNotificationService";
import { SmsNotificationService } from "@modules/notification/app/services/SmsNotifictionService";
import { KafkaConsumer } from "@modules/notification/infra/messaging/KafkaConsumer";
import { NotificationType } from "../../../shared/models/NotificationType";
import { NotifyUserEvent } from "../events/NotifyUserEvent";
import { PushNotificationService } from "@modules/notification/app/services/PushNotificationService";

export class NotifyUserHandler {
  constructor(
    private readonly kafkaConsumer: KafkaConsumer,
    private readonly emailNotificationService: EmailNotificationService,
    private readonly pushNotificationService: PushNotificationService,
    private readonly smsNotificationService: SmsNotificationService
  ) {
    /*this.kafkaConsumer.subscribe(
      "NotifyUserEvent",
      this.handleEvent.bind(this)
    );*/
  }

  private handleEvent(message: NotifyUserEvent) {
    const { user, auctionId } = message;

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
