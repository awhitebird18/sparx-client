// Review: Changed front and back to string instead of array of string
export interface Flashcard {
  uuid: string;
  title: string;
  topicUuid: string;
  createdOn: Date;
  createdBy: string;
  front?: string;
  back?: string;
  lastReviewed: Date;
}
