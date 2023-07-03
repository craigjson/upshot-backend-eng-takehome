import { NFT } from "@modules/shared/domain/models/NftCollection";
import { User } from "../../../shared/domain/models/User";

export interface NotifyUserEvent {
  user: User;
  auctionId: string;
  collection: NFT;
}

export class NotifyUserEvent {
  user: User;
  auctionId: string;
  collection: NFT;

  constructor(user: User, auctionId: string, collection: NFT) {
    this.user = user;
    this.auctionId = auctionId;
    this.collection = collection;
  }
}
