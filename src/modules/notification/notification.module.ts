import { Module } from "@nestjs/common";
import { EmailNotificationService } from "./app/services/EmailNotificationService";
import { NotifyUserHandler } from "./domain/handlers/NotifyUserHandler";
import { SmsNotificationService } from "./app/services/SmsNotifictionService";
import { KafkaConsumer } from "./infra/messaging/KafkaConsumer";

@Module({
  providers: [
    KafkaConsumer,
    EmailNotificationService,
    EmailNotificationService,
    SmsNotificationService,
    NotifyUserHandler,
  ],
})
export class NotificationModule {}
