# graphql-kafka-app

This project is a **simulated multi-microservice environment** built with **NestJS**, **GraphQL Federation**, and **Kafka**. Its purpose is to explore and test:

- Inter-service communication via Kafka
- GraphQL federation across independent services
- Realistic service boundaries (User, Wallet, Gateway)
- Event-driven architecture patterns

It is not a boilerplate or starter template, but a self-contained sandbox for experimenting with distributed service communication using modern backend tools.

## Services Included

- **user-service**: Manages user creation and publishes Kafka events
- **wallet-service**: Listens to Kafka events and reacts (e.g., auto-creates a wallet)
- **graphql-gateway**: Exposes a unified GraphQL schema using Apollo Federation

## Tech Stack

- NestJS
- GraphQL (Code-First + Federation)
- Apache Kafka (KRaft mode via Docker)
- Docker Compose

## Getting Started

```bash
docker-compose up --build