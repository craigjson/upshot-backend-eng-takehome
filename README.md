# Upshot Auction Backend Assignment

This repository contains the backend application, which is responsible for managing auctions and sending notifications to interested users.

## Prerequisites

Make sure you have the following dependencies installed on your machine:

- Node.js (v12 or higher)
- Yarn package manager
- Docker (optional, for running Kafka broker)

## Getting Started

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/upshot-auction-backend.git
   ```

2. Install dependencies:

   ```shell
   cd upshot-auction-backend
   yarn install
   ```

3. Configure Kafka (optional):

   If you want to run Kafka locally using Docker, follow these steps:

   - Install Docker on your machine.
   - Run the following command in the project root directory to start the Kafka broker:

     ```shell
     docker-compose up -d
     ```

   - Give Kafka a few minutes to spin up and get up and running

4. Start the application:

   ```shell
   yarn start
   ```

5. The application should now be running locally at `http://localhost:3000`.

## API Endpoints

- `POST /auctions`: Create a new auction. Send a JSON request body like so

```
{
  "id": "123",
  "nftCollection": {
      "id": "1",
      "collectionName": "CoolCats"
  }
}
```

# Architecture Overview

The Upshot Auction Notification Backend is built on the following architectural principles:

1. **Event-Driven Architecture**: The system adopts an event-driven architecture to decouple components and enable loose coupling. Events serve as the primary means of communication between different modules, allowing for independent evolution and scalability.

2. **Event Sourcing**: The system utilizes event sourcing to capture and store all state changes as a sequence of events. This approach provides auditability, traceability, and the ability to rebuild state at any given point in time.

3. **Kafka Messaging**: Kafka is used as the messaging system for event streaming. It provides durability, scalability, fault tolerance, and ordered processing of events. Kafka allows for asynchronous and distributed communication between modules.

### Modules and Functionality

The Upshot Auction Backend consists of the following modules:

1. **Auction Module**: Responsible for managing auctions. It provides APIs for creating and managing auction events.

2. **Notification Module**: Handles notification delivery for auction events. It listens to relevant events and triggers appropriate notifications to interested users.

### Implementation Details

#### Auction Module

The Auction Module provides the following functionality:

- **Auction Creation**: Exposes a RESTful API for creating new auctions. The API accepts an auction object containing the auction ID and collection information.

- **Persistence**: Uses a data repository or database to persist auction data. The Auction Repository handles the storage and retrieval of auction information.

- **Event Publishing**: Publishes an "AuctionCreatedEvent" to the Kafka messaging system upon successful auction creation. This event contains the necessary information about the newly created auction.

#### Notification Module

The Notification Module is responsible for handling notifications triggered by auction events. It performs the following tasks:

- **Event Subscription**: Subscribes to the "AuctionCreatedEvent" in the Kafka messaging system to receive notifications about newly created auctions.

- **Notification Handling**: Listens for "AuctionCreatedEvent" notifications and triggers appropriate notifications to interested users. The module determines the preferred notification method for each user (email, SMS, etc.) and sends notifications accordingly. This is done by creating a new event "NotifyUserEvent"

- **Notification Services**: Utilizes separate notification services for different notification methods (e.g., EmailNotificationService, SMSNotificationService). These services are responsible for sending notifications to users. This decision was made to enable scalability of these services, in the event for example the SMS service handles orders of magnitude more volume than Email or Push Notifications, this will allow us to easily scale that specific part of the system.

### Conclusion

The Upshot Auction Notification Backend is an event-driven system designed to manage auctions and deliver notifications for auction events. By leveraging event sourcing, Kafka messaging, and a modular architecture, the system provides scalability, extensibility, fault tolerance, and traceability.
