export class UserInterest {
  id: string;
  userId: string;
  collectionId: string;
  markedAt: Date;

  constructor(
    id: string,
    userId: string,
    collectionId: string,
    markedAt: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.collectionId = collectionId;
    this.markedAt = markedAt;
  }
}
