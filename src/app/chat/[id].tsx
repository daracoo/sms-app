import { useRef, useState } from "react";
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
import ComposeBar from "../../components/ComposeBar";
import { Message } from "../../data/message";
import { useChat } from "../../context/ChatContext";

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { conversations, messages, sendMessage, editMessage, deleteMessage } =
    useChat();
  const conversation = conversations.find((c) => c.id === id);
  const chatMessages = messages[id] ?? [];
  const listRef = useRef<FlatList<Message>>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

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
        data={chatMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble
            message={item}
            onLongPress={() => handleLongPress(item)}
          />
        )}
        contentContainerStyle={styles.list}
        onContentSizeChange={() =>
          listRef.current?.scrollToEnd({ animated: true })
        }
      />
      <ComposeBar
        onSend={handleSend}
        editingText={editingText}
        onCancelEdit={() => setEditingId(null)}
      />
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
