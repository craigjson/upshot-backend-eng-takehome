import { NFT } from "../models/NftCollection";

export interface AuctionCreatedEvent {
  auctionId: string;
  nftCollection: NFT;
}

export class AuctionCreatedEvent {
  auctionId: string;
  nftCollection: NFT;

  constructor(auctionId: string, nftCollection: NFT) {
    this.auctionId = auctionId;
    this.nftCollection = nftCollection;
  }
}
