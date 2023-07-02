export enum NotificationType {
  SMS = "SMS",
  Email = "Email",
  InApp = "InApp",
}

export class Notification {
  id: string;
  type: NotificationType;
  message: string;

  constructor(id: string, type: NotificationType, message: string) {
    this.id = id;
    this.type = type;
    this.message = message;
  }
}
