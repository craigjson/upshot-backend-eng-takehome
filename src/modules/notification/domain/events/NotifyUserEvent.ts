import { User } from "../../../shared/models/User";

export interface NotifyUserEvent {
  user: User;
  auctionId: string;
}
