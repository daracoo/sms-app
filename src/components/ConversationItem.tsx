import { View, Text, Pressable, StyleSheet } from "react-native";
import { Conversation } from "../data/conversations";

type Props = {
  conversation: Conversation;
};

export default function ConversationItem({ conversation }: Props) {
  return (
    <Pressable style={styles.row}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {conversation.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.topLine}>
          <Text style={styles.name}>{conversation.name}</Text>
          <Text style={styles.time}>{conversation.time}</Text>
        </View>
        <Text style={styles.preview} numberOfLines={1}>
          {conversation.lastMessage}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4F8EF7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  time: {
    fontSize: 13,
    color: "#888",
  },
  preview: {
    fontSize: 14,
    color: "#666",
  },
});