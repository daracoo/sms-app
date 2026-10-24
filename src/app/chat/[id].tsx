import { useRef } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import MessageBubble from "../../components/MessageBubble";
import ComposeBar from "../../components/ComposeBar";
import { Message } from "../../data/message";
import { useChat } from "../../context/ChatContext";

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { conversations, messages, sendMessage } = useChat();
  const conversation = conversations.find((c) => c.id === id);
  const chatMessages = messages[id] ?? [];
  const listRef = useRef<FlatList<Message>>(null);

  if (!conversation) {
    return (
      <View style={styles.center}>
        <Text>Conversation not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: conversation.name }} />
      <FlatList
        ref={listRef}
        data={chatMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={styles.list}
        onContentSizeChange={() =>
          listRef.current?.scrollToEnd({ animated: true })
        }
      />
      <ComposeBar onSend={(text) => sendMessage(conversation.id, text)} />
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
});