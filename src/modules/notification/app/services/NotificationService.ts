import { Injectable } from "@nestjs/common";
import { NotifyUserHandler } from "../../domain/handlers/NotifyUserHandler";
import { AuctionCreatedHandler } from "../../domain/handlers/AuctionCreatedHandler";

@Injectable()
export class NotificationService {
  constructor(
    private readonly notifyUserHandler: NotifyUserHandler,
    private readonly auctionCreatedHandler: AuctionCreatedHandler
  ) {}
}
