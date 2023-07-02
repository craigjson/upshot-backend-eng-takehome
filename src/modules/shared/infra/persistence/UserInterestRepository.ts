import { UserInterest } from "../../domain/models/UserInterest";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserInterestRepository {
  private readonly userInterests: UserInterest[] = [
    // Use the Mock Users in the UserRepository.ts file
    {
      userId: "1",
      collectionId: "1",
      markedAt: new Date(),
    },
    {
      userId: "2",
      collectionId: "1",
      markedAt: new Date(),
    },
    {
      userId: "3",
      collectionId: "1",
      markedAt: new Date(),
    },
    {
      userId: "1",
      collectionId: "2",
      markedAt: new Date(),
    },
    {
      userId: "2",
      collectionId: "2",
      markedAt: new Date(),
    },
  ];

  async findByUserId(userId: string): Promise<UserInterest[]> {
    return this.userInterests.filter((interest) => interest.userId === userId);
  }

  async findInterestedUsersByCollectionId(
    collectionId: string
  ): Promise<UserInterest[]> {
    const interestedUsers = this.userInterests.filter(
      (interest) => interest.collectionId === collectionId
    );
    return interestedUsers;
  }
}
