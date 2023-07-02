import { AuctionCreatedEvent } from "@modules/auction/domain/events/AuctionCreatedEvent";
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
      message.nftCollection
    );
    console.log(`Found ${interestedUsers.length} interested users`);
    console.log("Found Event: AuctionCreatedEvent");
    interestedUsers.forEach((user) => {
      const notifyUserEvent: NotifyUserEvent = {
        userId: user.id,
        auctionId: message.auctionId,
      };

      this.producer.publish("NotifyUserEvent", notifyUserEvent);
    });
  }
}
