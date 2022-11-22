export interface MessageType {
  _id: string;
  message: string;
  author: string;
  datetime: Date;
}

export interface PostMessageType {
  message: string;
  author: string;
}