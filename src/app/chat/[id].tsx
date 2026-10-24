import { View, Text, FlatList, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import MessageBubble from "../../components/MessageBubble";
import { conversations } from "../../data/conversations";
import { messagesByConversation } from "../../data/message";

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const conversation = conversations.find((c) => c.id === id);
  const messages = messagesByConversation[id] ?? [];

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
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={styles.list}
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
});