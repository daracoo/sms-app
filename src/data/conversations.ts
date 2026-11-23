import { daysAgo } from "../utils/date";

export type Conversation = {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  timestamp: number;
};

export const conversations: Conversation[] = [
  { id: "1", name: "Mom", phone: "+389 70 111 222", lastMessage: "Don't forget to call me tonight", timestamp: daysAgo(0, 9, 40) },
  { id: "2", name: "Ana", phone: "+389 71 333 444", lastMessage: "See you tomorrow at the cafe!", timestamp: daysAgo(1, 18, 12) },
  { id: "3", name: "Marko", phone: "+389 72 555 666", lastMessage: "Did you finish the assignment?", timestamp: daysAgo(2, 14, 30) },
  { id: "4", name: "+389 75 777 888", phone: "+389 75 777 888", lastMessage: "Your code is 482913", timestamp: new Date(2025, 9, 28, 9, 15).getTime() },
];