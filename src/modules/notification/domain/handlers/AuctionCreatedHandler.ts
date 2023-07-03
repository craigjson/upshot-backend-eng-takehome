import { AuctionCreatedEvent } from "@modules/shared/domain/events/AuctionCreatedEvent";
import { KafkaConsumer } from "../../infra/messaging/KafkaConsumer";
import { KafkaProducer } from "../../../shared/infra/messaging/KafkaProducer";
import { NotifyUserEvent } from "../events/NotifyUserEvent";
import { Injectable } from "@nestjs/common";
import { UserInterestService } from "../../../shared/app/services/UserInterestService";

@Injectable()
export class AuctionCreatedHandler {
  constructor(
    private consumer: KafkaConsumer,
    private userInterestService: UserInterestService,
    private producer: KafkaProducer
  ) {
    this.consumer.subscribe("AuctionCreatedEvent", this.handleEvent.bind(this));
  }

  async handleEvent(message: AuctionCreatedEvent) {
    const interestedUsers = await this.userInterestService.getInterestedUsers(
      message.nftCollection.id
    );
    console.log("Found Event: AuctionCreatedEvent");
    for (const user of interestedUsers) {
      this.producer.publish(
        "NotifyUserEvent",
        new NotifyUserEvent(user, message.auctionId, message.nftCollection)
      );
    }
  }
}
