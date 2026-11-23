import { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import MessageBubble from "../../components/MessageBubble";
import DateSeparator from "../../components/DateSeparator";
import ComposeBar from "../../components/ComposeBar";
import { Message } from "@/data/message";
import { useChat } from "../../context/ChatContext";
import { formatDayLabel, startOfDay } from "../../utils/date";
import RepliesDisabledNotice from "@/components/RepliesDisabledNotice";

type ListItem =
  | { type: "date"; id: string; label: string }
  | { type: "message"; id: string; message: Message };

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { conversations, messages, sendMessage, editMessage, deleteMessage } =
    useChat();
  const conversation = conversations.find((c) => c.id === id);
  const chatMessages = messages[id] ?? [];
  const listRef = useRef<FlatList<ListItem>>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const repliesDisabled = conversation?.repliesDisabled ?? false;
  const showNotice = repliesDisabled && !unlocked && editingId === null;

  const items = useMemo<ListItem[]>(() => {
    const result: ListItem[] = [];
    let lastDay: number | null = null;

    for (const message of chatMessages) {
      const day = startOfDay(message.timestamp);
      if (day !== lastDay) {
        result.push({
          type: "date",
          id: `date-${day}`,
          label: formatDayLabel(message.timestamp),
        });
        lastDay = day;
      }
      result.push({ type: "message", id: message.id, message });
    }
    return result;
  }, [chatMessages]);

  const editingMessage = chatMessages.find((m) => m.id === editingId);
  const editingText = editingMessage ? editingMessage.text : null;

  if (!conversation) {
    return (
      <View style={styles.center}>
        <Text>Conversation not found</Text>
      </View>
    );
  }

  const handleLongPress = (message: Message) => {
    Alert.alert("Message", undefined, [
      { text: "Edit", onPress: () => setEditingId(message.id) },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteMessage(conversation.id, message.id),
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleSend = (text: string, sender: Message["sender"]) => {
    if (editingId) {
      editMessage(conversation.id, editingId, text);
      setEditingId(null);
    } else {
      sendMessage(conversation.id, text, sender);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: conversation.name,
          headerRight: () => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/edit_contact",
                  params: { id: conversation.id },
                })
              }
            >
              <Text style={styles.headerButton}>Edit</Text>
            </Pressable>
          ),
        }}
      />
      <FlatList
        ref={listRef}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          item.type === "date" ? (
            <DateSeparator label={item.label} />
          ) : (
            <MessageBubble
              message={item.message}
              onLongPress={() => handleLongPress(item.message)}
            />
          )
        }
        contentContainerStyle={styles.list}
        onContentSizeChange={() =>
          listRef.current?.scrollToEnd({ animated: true })
        }
      />
      {showNotice ? (
        <RepliesDisabledNotice onUnlock={() => setUnlocked(true)} />
      ) : (
        <ComposeBar
          onSend={handleSend}
          editingText={editingText}
          onCancelEdit={() => setEditingId(null)}
          lockedSender={repliesDisabled ? "them" : undefined}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    padding: 12,
  },
  headerButton: {
    color: "#4F8EF7",
    fontSize: 16,
    fontWeight: "600",
  },
});
