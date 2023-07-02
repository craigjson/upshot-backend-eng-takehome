export class UserInterest {
  userId: string;
  collectionId: string;
  markedAt: Date;

  constructor(userId: string, collectionId: string, markedAt: Date) {
    this.userId = userId;
    this.collectionId = collectionId;
    this.markedAt = markedAt;
  }
}
