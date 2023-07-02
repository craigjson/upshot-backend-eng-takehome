import { NFT } from "@modules/nft/domain/models/NFT";

export class Auction {
  id: string;
  nft: NFT;
  startDate: Date;
  endDate: Date;

  constructor(id: string, nft: NFT, startDate: Date, endDate: Date) {
    this.id = id;
    this.nft = nft;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
