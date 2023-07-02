import { Kafka } from "kafkajs";

export class KafkaProducer {
  private producer: any;

  constructor() {
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["localhost:9092"],
    });
    this.producer = kafka.producer();
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
