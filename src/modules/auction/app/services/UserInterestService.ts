import { Injectable } from "@nestjs/common";
import { UserInterestRepository } from "../../infra/persistence/UserInterestRepository";
import { UserRepository } from "../../infra/persistence/UserRepository";
import { User } from "../../domain/models/User";

@Injectable()
export class UserInterestService {
  constructor(
    private readonly userInterestRepository: UserInterestRepository,
    private readonly userRepository: UserRepository
  ) {}

  async getInterestedUsers(collectionId: string): Promise<User[]> {
    const interestedUsers =
      await this.userInterestRepository.findInterestedUsersByCollectionId(
        collectionId
      );

    const users = interestedUsers.map((interest) =>
      this.userRepository.findById(interest.userId)
    );
    return users;
  }
}
