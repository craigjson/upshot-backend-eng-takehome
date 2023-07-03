import { Module } from "@nestjs/common";
import { KafkaConsumer } from "./infra/messaging/KafkaConsumer";
import { NotificationService } from "./app/services/NotificationService";
import { SmsNotificationService } from "./app/services/SmsNotifictionService";
import { PushNotificationService } from "./app/services/PushNotificationService";
import { EmailNotificationService } from "./app/services/EmailNotificationService";
import { UserInterestService } from "../shared/app/services/UserInterestService";
import { UserService } from "../shared/app/services/UserService";
import { KafkaProducer } from "../shared/infra/messaging/KafkaProducer";
import { UserRepository } from "../shared/infra/persistence/UserRepository";
import { UserInterestRepository } from "../shared/infra/persistence/UserInterestRepository";

@Module({
  providers: [
    NotificationService,
    {
      provide: KafkaConsumer,
      useValue: new KafkaConsumer("upshot-auction-notifications"),
    },
    KafkaProducer,
    SmsNotificationService,
    PushNotificationService,
    EmailNotificationService,
    UserInterestService,
    UserRepository,
    UserInterestRepository,
    UserService,
  ],
})
export class NotificationModule {}
