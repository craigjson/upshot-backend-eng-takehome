import { Injectable } from "@nestjs/common";
import { NotifyUserHandler } from "../../domain/handlers/NotifyUserHandler";
import { AuctionCreatedHandler } from "../../domain/handlers/AuctionCreatedHandler";
import { EmailNotificationService } from "./EmailNotificationService";
import { PushNotificationService } from "./PushNotificationService";
import { SmsNotificationService } from "./SmsNotifictionService";
import { UserInterestService } from "../../../shared/app/services/UserInterestService";
import { UserService } from "../../../shared/app/services/UserService";
import { KafkaConsumer } from "../../infra/messaging/KafkaConsumer";
import { KafkaProducer } from "../../../shared/infra/messaging/KafkaProducer";

@Injectable()
export class NotificationService {
  constructor(
    emailNotificationService: EmailNotificationService,
    pushNotificationService: PushNotificationService,
    smsNotificationService: SmsNotificationService,
    userService: UserService,
    userInterestService: UserInterestService,
    kafkaProducer: KafkaProducer
  ) {
    const kafkaConsumerAuction = new KafkaConsumer("auctionCreatedEvent");
    const kafkaConsumerNotify = new KafkaConsumer("notifyUserEvent");

    // Instantiate the handlers
    new AuctionCreatedHandler(
      kafkaConsumerAuction,
      userInterestService,
      kafkaProducer
    );

    new NotifyUserHandler(
      emailNotificationService,
      pushNotificationService,
      smsNotificationService,
      kafkaConsumerNotify
    );
  }
}
