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
    const interestedUsers = this.userInterestService.getUsers();
    console.log("Found Event: AuctionCreatedEvent");
    console.log(message);
    interestedUsers.forEach((user) => {
      const notifyUserEvent: NotifyUserEvent = {
        user: user,
        auctionId: message.auctionId,
        collectionId: message.nftCollection,
      };

      this.producer.publish("NotifyUserEvent", notifyUserEvent);
    });
  }
}
