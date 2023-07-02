import { Kafka, Consumer } from "kafkajs";

export class KafkaConsumer {
  private consumer: Consumer;

  constructor(groupId: string) {
    const kafka = new Kafka({
      clientId: "upshot-auction-notification-consumer",
      brokers: ["localhost:9092"],
    });

    this.consumer = kafka.consumer({ groupId: groupId });
  }

  async subscribe(
    topic: string,
    callback: (message: any) => void
  ): Promise<void> {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: topic, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        callback(JSON.parse(message.value.toString()));
      },
    });
  }
}
