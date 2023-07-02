import { NotificationType } from "./NotificationType";

export class User {
  id: string;
  phoneNumber: string;
  email: string;
  notificationPreferences: NotificationType[];

  constructor(
    id: string,
    phoneNumber: string,
    email: string,
    notificationPreferences: NotificationType[]
  ) {
    this.id = id;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.notificationPreferences = notificationPreferences;
  }
}
