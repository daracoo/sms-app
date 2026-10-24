export type Conversation = {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  time: string;
};

export const conversations: Conversation[] = [
  { id: "1", name: "Mama", phone: "+389 70 111 222", lastMessage: "Javi mi se", time: "21:40" },
  { id: "2", name: "Ana", phone: "+389 71 333 444", lastMessage: "Odi insta", time: "18:12" },
  { id: "3", name: "Marko", phone: "+389 72 555 666", lastMessage: "Zavrsi be?", time: "Yesterday" },
  { id: "4", name: "+389 75 777 888", phone: "+389 75 777 888", lastMessage: "Your code is 482913", time: "Mon" },
];