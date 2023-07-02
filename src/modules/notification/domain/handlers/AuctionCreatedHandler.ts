import { AuctionCreatedEvent } from "@modules/auction/domain/events/AuctionCreatedEvent";
import { KafkaConsumer } from "@modules/notification/infra/messaging/KafkaConsumer";
import { KafkaProducer } from "@modules/shared/infra/messaging/KafkaProducer";
import { NotifyUserEvent } from "../events/NotifyUserEvent";
import { UserInterestService } from "@modules/auction/app/services/UserInterestService";

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

    interestedUsers.forEach((user) => {
      const notifyUserEvent: NotifyUserEvent = {
        user: user,
        auctionId: message.auctionId,
      };

      this.producer.publish("NotifyUserEvent", notifyUserEvent);
    });
  }
}
