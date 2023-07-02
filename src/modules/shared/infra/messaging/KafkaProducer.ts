import { Kafka, Partitioners } from "kafkajs";

export class KafkaProducer {
  private producer: any;

  constructor() {
    const kafka = new Kafka({
      clientId: "upshot-auction-notifications",
      brokers: ["localhost:9092"],
    });

    this.producer = kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });
  }

  async publish(topic: string, message: any): Promise<void> {
    await this.producer.connect();
    await this.producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    await this.producer.disconnect();
  }
}
