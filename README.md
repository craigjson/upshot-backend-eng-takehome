# Upshot Auction Backend Assignment

This repository contains the backend application, which is responsible for managing auctions and sending notifications to interested users.

# Architecture Diagram

https://drive.google.com/file/d/12t_D_6Pg2tfGIFs_XMFr4xbJotHqOVoE/view?usp=sharing

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

## Implementation Details

### Auction Module

The Auction Module provides the following functionality:

- **Auction Creation**: Exposes a RESTful API for creating new auctions. The API accepts an auction object containing the auction ID and collection information.

- **Persistence**: Uses a data repository or database to persist auction data. The Auction Repository handles the storage and retrieval of auction information.

- **Event Publishing**: Publishes an "AuctionCreatedEvent" to the Kafka messaging system upon successful auction creation. This event contains the necessary information about the newly created auction.

### Notification Module

The Notification Module is responsible for handling notifications triggered by auction events. It performs the following tasks:

- **Event Subscription**: Subscribes to the "AuctionCreatedEvent" in the Kafka messaging system to receive notifications about newly created auctions.

- **Event Handling**: Two Handlers are implemented, AuctionCreatedHandler & NotifyUserHandler. The AuctionCreatedHandler listens for the AuctionCreatedEvent, looks up the users that are interested in the collection specified by this event and creates a new event `NotifyUserEvent` which is handled by the NotifyUserHandler. The NotifyUserHandler is responsible for deciding which services, chosen by the user's NotificationPreferences, will be called.

- **Notification Services**: Utilizes separate notification services for different notification methods (e.g., EmailNotificationService, SMSNotificationService). These services are responsible for sending notifications to users. This decision was made to enable scalability of these services, in the event for example the SMS service handles orders of magnitude more volume than Email or Push Notifications, this will allow us to easily scale that specific part of the system.

## Conclusion

The Upshot Auction Notification Backend is an event-driven system designed to manage auctions and deliver notifications for auction events. By leveraging event sourcing, Kafka messaging, and a modular architecture, the system provides scalability, extensibility, fault tolerance, and traceability.

## Assumptions

1. The major assumption made here was that our AuctionCreated API would be called by either a webhook or some other service that is responsible for actually storing Auction data.
2. A smaller assumption is that User data is managed by another service, including favoriting or marking collections as interesting.

## Tradeoffs

In implementing the system, the following tradeoffs were made:

1. **Complexity vs. Scalability**: The event-driven architecture and event sourcing introduce complexity to the system. While this architecture enables scalability and extensibility, it requires careful design and implementation. The tradeoff here is the additional complexity involved in setting up and maintaining the event-driven infrastructure compared to a simpler monolithic architecture.

2. **Operational Overhead**: Running and managing a Kafka messaging system introduces operational overhead. Setting up and configuring Kafka brokers, topics, and consumer groups require additional effort and expertise. The tradeoff here is the need for dedicated resources and ongoing maintenance to ensure the smooth operation of the messaging system.

3. **Increased Development Effort**: Implementing an event-driven system with event sourcing and message handling requires additional development effort compared to a traditional request/response-based system. It involves designing events, defining event schemas, handling message processing, and managing event persistence. The tradeoff here is the increased upfront development effort and potential learning curve for developers.

4. **Flexibility and Extensibility**: The event-driven architecture allows for flexible and extensible system growth. New modules can be easily added by subscribing to relevant events. However, this flexibility comes at the cost of increased complexity in managing event subscriptions, message handling, and ensuring the correct flow of events across modules.

## Potential Future Improvements

Given more time, there are several potential improvements that can be made to enhance the Upshot Auction Backend:

1. **Authentication and Authorization**: Implement a robust authentication and authorization mechanism to secure the API endpoints and ensure that only authorized users can perform actions like creating auctions or subscribing to notifications.

2. **Validation and Error Handling**: Enhance the input validation and error handling mechanisms to provide informative error messages and handle exceptional cases gracefully. This can improve the user experience and help in identifying and resolving issues more effectively.

3. **Monitoring and Logging**: Implement monitoring and logging solutions to gain visibility into the system's performance and troubleshoot issues. This can include monitoring key metrics, setting up alerting mechanisms, and logging relevant information to aid in debugging and performance optimization.

4. **Testing and Test Automation**: Expand the test coverage by implementing unit tests, integration tests, and end-to-end tests for critical functionalities. Test automation can help catch bugs early, ensure system stability, and support continuous integration and delivery practices.

5. **Error Handling and Retry Mechanisms**: Enhance error handling and retry mechanisms for message processing. Implement strategies such as dead-letter queues, backoff algorithms, and error logging to handle transient failures and ensure reliable message processing.

These improvements can enhance the functionality, performance, reliability, and maintainability of the system, making it more robust and scalable in the long run.


### Misc Notes
1. Imports are kind of a mess due to the time constraint and an issue I was running in with @module tsconfig style imports not working with the debugger. 
2. There are no unit tests again due to time constraint
3. Error Handling / Retry Mechanisms with Kafka are essentially non existent and the service will likely crash if input is incorrect Kafka is experiencing issues/isn't up. Typically my workflow would start with unit tests and practical error handling but I was really feeling the pressure with the time limit
