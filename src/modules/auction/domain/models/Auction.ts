import { NFT } from "./NftCollection";

export class Auction {
  id: string;
  nftCollection: NFT;
  startDate: Date;
  endDate: Date;

  constructor(id: string, nftCollection: NFT, startDate: Date, endDate: Date) {
    this.id = id;
    this.nftCollection = nftCollection;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
