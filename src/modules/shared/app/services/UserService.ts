// Implement UserService with FindById method that uses UserRepository

import { User } from "../../domain/models/User";
import { UserRepository } from "../../infra/persistence/UserRepository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findById(id: string): User | undefined {
    return this.userRepository.findById(id);
  }
}
