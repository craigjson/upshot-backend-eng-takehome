import { Injectable } from "@nestjs/common";
import { User } from "../../../shared/models/User";
import { NotificationType } from "../../../shared/models/NotificationType";
@Injectable()
export class UserRepository {
  private users: User[] = [
    {
      id: "1",
      email: "",
      phoneNumber: "1234567890",
      notificationPreferences: [NotificationType.Email, NotificationType.SMS],
    },
    {
      id: "2",
      email: "",
      phoneNumber: "1234567890",
      notificationPreferences: [NotificationType.InApp, NotificationType.SMS],
    },
    {
      id: "3",
      email: "",
      phoneNumber: "1234567890",
      notificationPreferences: [NotificationType.Email, NotificationType.InApp],
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
