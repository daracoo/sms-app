import { createContext, useContext, useState, ReactNode } from "react";
import {
  Conversation,
  conversations as initialConversations,
} from "../data/conversations";
import { Message, messagesByConversation } from "../data/message";

type ChatContextValue = {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  sendMessage: (
    conversationId: string,
    text: string,
    sender?: Message["sender"],
  ) => void;
  startConversation: (
    phone: string,
    text: string,
    sender?: Message["sender"],
  ) => string;
  editMessage: (
    conversationId: string,
    messageId: string,
    text: string,
  ) => void;
  deleteMessage: (conversationId: string, messageId: string) => void;
  updateContact: (conversationId: string, name: string, phone: string) => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

const formatTime = (date: Date) =>
  `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;

const normalize = (phone: string) => phone.replace(/[\s-]/g, "");

// Keeps the list preview in sync with the last message of a conversation
const syncPreview = (
  list: Conversation[],
  conversationId: string,
  msgs: Message[],
) =>
  list.map((c) => {
    if (c.id !== conversationId) return c;
    const last = msgs[msgs.length - 1];
    return {
      ...c,
      lastMessage: last ? last.text : "",
      time: last ? last.time : c.time,
    };
  });

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [messages, setMessages] = useState<Record<string, Message[]>>(
    messagesByConversation,
  );

  const sendMessage = (
    conversationId: string,
    text: string,
    sender: Message["sender"] = "me",
  ) => {
    const time = formatTime(new Date());
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender,
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

  const startConversation = (
    phone: string,
    text: string,
    sender: Message["sender"] = "me",
  ) => {
    const existing = conversations.find(
      (c) => normalize(c.phone) === normalize(phone),
    );
    if (existing) {
      sendMessage(existing.id, text, sender);
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
      [id]: [{ id: "1", text, sender, time }],
    }));
    return id;
  };

  const editMessage = (
    conversationId: string,
    messageId: string,
    text: string,
  ) => {
    const updated = (messages[conversationId] ?? []).map((m) =>
      m.id === messageId ? { ...m, text } : m,
    );
    setMessages((prev) => ({ ...prev, [conversationId]: updated }));
    setConversations((prev) => syncPreview(prev, conversationId, updated));
  };

  const deleteMessage = (conversationId: string, messageId: string) => {
    const updated = (messages[conversationId] ?? []).filter(
      (m) => m.id !== messageId,
    );
    setMessages((prev) => ({ ...prev, [conversationId]: updated }));
    setConversations((prev) => syncPreview(prev, conversationId, updated));
  };

  const updateContact = (
    conversationId: string,
    name: string,
    phone: string,
  ) => {
    const cleanPhone = phone.trim();
    const cleanName = name.trim() || cleanPhone;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? { ...c, name: cleanName, phone: cleanPhone }
          : c,
      ),
    );
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        messages,
        sendMessage,
        startConversation,
        editMessage,
        deleteMessage,
        updateContact,
      }}
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
