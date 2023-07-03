import { NFT } from "../../../shared/domain/models/NftCollection";

export class Auction {
  id: string;
  nftCollection: NFT;

  constructor(id: string, nftCollection: NFT) {
    this.id = id;
    this.nftCollection = nftCollection;
  }
}
