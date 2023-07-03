import { User } from "../../../shared/domain/models/User";

export interface NotifyUserEvent {
  user: User;
  auctionId: string;
  collectionId: string;
}
