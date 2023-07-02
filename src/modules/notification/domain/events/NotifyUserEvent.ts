import { User } from "../../../shared/domain/models/User";

export interface NotifyUserEvent {
  userId: string;
  auctionId: string;
}
