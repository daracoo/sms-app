import { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import MessageBubble from "../../components/MessageBubble";
import ComposeBar from "../../components/ComposeBar";
import { conversations } from "../../data/conversations";
import { Message, messagesByConversation } from "../../data/message";

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const conversation = conversations.find((c) => c.id === id);
  const [messages, setMessages] = useState<Message[]>(
    messagesByConversation[id] ?? []
  );
  const listRef = useRef<FlatList<Message>>(null);

  const handleSend = (text: string) => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text, sender: "me", time },
    ]);
  };

  if (!conversation) {
    return (
      <View style={styles.center}>
        <Text>Conversation not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Stack.Screen options={{ title: conversation.name }} />
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={styles.list}
        onContentSizeChange={() =>
          listRef.current?.scrollToEnd({ animated: true })
        }
      />
      <ComposeBar onSend={handleSend} />
    </KeyboardAvoidingView>
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
});