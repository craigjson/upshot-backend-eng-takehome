import { NotifyUserEvent } from "@modules/notification/domain/events/NotifyUserEvent";
import { KafkaConsumer } from "@modules/notification/infra/messaging/KafkaConsumer";
import { NotificationType } from "@modules/shared/models/NotificationType";
import { EmailNotificationService } from "./EmailNotificationService";
import { SmsNotificationService } from "./SmsNotifictionService";

export class NotificationService {
  constructor(
    private readonly kafkaConsumer: KafkaConsumer,
    private readonly emailNotificationService: EmailNotificationService,
    private readonly smsNotificationService: SmsNotificationService
  ) {
    this.kafkaConsumer.subscribe(
      "NotifyUserEvent",
      this.handleEvent.bind(this)
    );
  }

  private handleEvent(message: NotifyUserEvent) {
    const user = message.user;

    // Iterate over user notification preferences and send notifications
    user.notificationPreferences.forEach((preference) => {
      switch (preference) {
        case NotificationType.Email:
          this.emailNotificationService.sendNotification(
            user.id,
            message.auctionId
          );
          break;
        case NotificationType.InApp:
          this.smsNotificationService.sendNotification(
            user.id,
            message.auctionId
          );
          break;
        case NotificationType.SMS:
          this.smsNotificationService.sendNotification(
            user.id,
            message.auctionId
          );
          break;
        default:
          console.log(`Unsupported notification type: ${preference}`);
          break;
      }
    });
  }
}
