export type NotificationPreferences = {
  email: boolean;
  inApp: boolean;
  sms: boolean;
};

export class User {
  id: string;
  email: string;
  phoneNumber: string;
  preferences: NotificationPreferences;
  interestedCollections: string[]; // a list of collection names the user is interested in

  constructor(
    id: string,
    email: string,
    phoneNumber: string,
    preferences: NotificationPreferences,
    interestedCollections: string[]
  ) {
    this.id = id;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.preferences = preferences;
    this.interestedCollections = interestedCollections;
  }

  isInterested(collectionName: string) {
    return this.interestedCollections.includes(collectionName);
  }
}
