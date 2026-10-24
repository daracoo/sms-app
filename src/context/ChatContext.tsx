import { createContext, useContext, useState, ReactNode } from "react";
import {
  Conversation,
  conversations as initialConversations,
} from "../data/conversations";
import { Message, messagesByConversation } from "../data/message";

type ChatContextValue = {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  sendMessage: (conversationId: string, text: string) => void;
  startConversation: (phone: string, text: string) => string;
};

const ChatContext = createContext<ChatContextValue | null>(null);

const formatTime = (date: Date) =>
  `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;

const normalize = (phone: string) => phone.replace(/[\s-]/g, "");

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [messages, setMessages] =
    useState<Record<string, Message[]>>(messagesByConversation);

  const sendMessage = (conversationId: string, text: string) => {
    const time = formatTime(new Date());
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: "me",
      time,
    };

    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] ?? []), message],
    }));

    setConversations((prev) => {
      const current = prev.find((c) => c.id === conversationId);
      if (!current) return prev;
      const updated = { ...current, lastMessage: text, time };
      return [updated, ...prev.filter((c) => c.id !== conversationId)];
    });
  };

  const startConversation = (phone: string, text: string) => {
    const existing = conversations.find(
      (c) => normalize(c.phone) === normalize(phone)
    );
    if (existing) {
      sendMessage(existing.id, text);
      return existing.id;
    }

    const id = Date.now().toString();
    const time = formatTime(new Date());
    const cleanPhone = phone.trim();

    setConversations((prev) => [
      { id, name: cleanPhone, phone: cleanPhone, lastMessage: text, time },
      ...prev,
    ]);
    setMessages((prev) => ({
      ...prev,
      [id]: [{ id: "1", text, sender: "me", time }],
    }));
    return id;
  };

  return (
    <ChatContext.Provider
      value={{ conversations, messages, sendMessage, startConversation }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
}