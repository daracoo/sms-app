import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  resetData: () => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

const STORAGE_KEY = "fake-sms:v1";

const normalize = (phone: string) => phone.replace(/[\s-]/g, "");

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
      timestamp: last ? last.timestamp : c.timestamp,
    };
  });

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [messages, setMessages] = useState<Record<string, Message[]>>(
    messagesByConversation,
  );

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw);
          if (saved.conversations && saved.messages) {
            setConversations(saved.conversations);
            setMessages(saved.messages);
          }
        }
      } catch (e) {
        console.warn("Failed to load chats", e);
      } finally {
        setLoaded(true);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ conversations, messages }),
    ).catch((e) => console.warn("Failed to save chats", e));
  }, [conversations, messages, loaded]);

  const sendMessage = (
    conversationId: string,
    text: string,
    sender: Message["sender"] = "me",
  ) => {
    const timestamp = Date.now();
    const message: Message = {
      id: timestamp.toString(),
      text,
      sender,
      timestamp,
    };

    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] ?? []), message],
    }));

    setConversations((prev) => {
      const current = prev.find((c) => c.id === conversationId);
      if (!current) return prev;
      const updated = { ...current, lastMessage: text, timestamp };
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

    const timestamp = Date.now();
    const id = timestamp.toString();
    const cleanPhone = phone.trim();

    setConversations((prev) => [
      { id, name: cleanPhone, phone: cleanPhone, lastMessage: text, timestamp },
      ...prev,
    ]);
    setMessages((prev) => ({
      ...prev,
      [id]: [{ id: "1", text, sender, timestamp }],
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

  const resetData = () => {
    setConversations(initialConversations);
    setMessages(messagesByConversation);
  };

  if (!loaded) return null;

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
        resetData
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
