import { daysAgo } from "../utils/date";

export type Message = {
  id: string;
  text: string;
  sender: "me" | "them";
  timestamp: number;
};

const ticket = (
  id: string,
  year: number,
  month: number, 
  day: number,
  hour: number,
  minute: number
): Message => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    id,
    sender: "them",
    text: `Kupivte bilet za edno vozenje so cena od 40 denari na ${pad(day)}.${pad(month)}.${year} ${pad(hour)}:${pad(minute)}`,
    timestamp: new Date(year, month - 1, day, hour, minute).getTime(),
  };
};

export const messagesByConversation: Record<string, Message[]> = {
  "1": [
    { id: "1", text: "Hi sweetheart, how was your day?", sender: "them", timestamp: daysAgo(2, 20, 55) },
    { id: "2", text: "Pretty good, I worked on my project all day", sender: "me", timestamp: daysAgo(2, 21, 2) },
    { id: "3", text: "Nice! Did you eat something?", sender: "them", timestamp: daysAgo(1, 21, 5) },
    { id: "4", text: "Yes, I had dinner an hour ago", sender: "me", timestamp: daysAgo(1, 21, 10) },
    { id: "5", text: "Don't forget to call me tonight", sender: "them", timestamp: daysAgo(0, 9, 40) },
  ],
  "2": [
    { id: "1", text: "Are you free tomorrow?", sender: "them", timestamp: daysAgo(1, 17, 50) },
    { id: "2", text: "Yes, after 4 pm", sender: "me", timestamp: daysAgo(1, 18, 5) },
    { id: "3", text: "See you tomorrow at the cafe!", sender: "them", timestamp: daysAgo(1, 18, 12) },
  ],
  "3": [
    { id: "1", text: "Did you finish the assignment?", sender: "them", timestamp: daysAgo(2, 14, 30) },
  ],
  "4": [
    { id: "1", text: "Your code is 482913", sender: "them", timestamp: new Date(2025, 9, 28, 9, 15).getTime() },
  ],
    "5": [
    ticket("1", 2026, 1, 8, 16, 1),
    ticket("2", 2026, 1, 9, 7, 45),
    ticket("3", 2026, 3, 9, 17, 12),
    ticket("4", 2026, 5, 12, 8, 3),
    ticket("5", 2026, 6, 12, 16, 40),
    ticket("6", 2026, 9, 15, 7, 52),
    ticket("7", 2026, 10, 16, 18, 5),
    ticket("8", 2026, 11, 20, 8, 10),
  ],
};