import { View, Text, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { conversations } from "../../data/conversations";

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const conversation = conversations.find((c) => c.id === id);

  if (!conversation) {
    return (
      <View style={styles.center}>
        <Text>Conversation not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Stack.Screen options={{ title: conversation.name }} />
      <Text style={styles.phone}>{conversation.phone}</Text>
      <Text>Chat for conversation {conversation.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  phone: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
});