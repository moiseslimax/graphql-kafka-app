import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Kafka, Producer, Consumer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private readonly logger = new Logger(KafkaService.name);
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  async onModuleInit() {
    this.kafka = new Kafka({
      brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
      clientId: process.env.KAFKA_CLIENT_ID || 'wallet-service',
      retry: { initialRetryTime: 1000, retries: 10 },
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'wallet-consumer-group' });

    await this.producer.connect();

    this.logger.log('✅ Connected to Kafka successfully');

  }

  async send(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }

  getConsumer() {
    return this.consumer;
  }

  getKafka() {
    return this.kafka;
  }
}