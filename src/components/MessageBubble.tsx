import { View, Text, StyleSheet } from "react-native";
import { Message } from "../data/message"

type Props = {
  message: Message;
};

export default function MessageBubble({ message }: Props) {
  const isMe = message.sender === "me";

  return (
    <View style={[styles.bubble, isMe ? styles.mine : styles.theirs]}>
      <Text style={[styles.text, isMe && styles.mineText]}>{message.text}</Text>
      <Text style={[styles.time, isMe && styles.mineTime]}>{message.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "75%",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    marginVertical: 3,
  },
  mine: {
    alignSelf: "flex-end",
    backgroundColor: "#4F8EF7",
    borderBottomRightRadius: 4,
  },
  theirs: {
    alignSelf: "flex-start",
    backgroundColor: "#E9E9EB",
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 16,
    color: "#111",
  },
  mineText: {
    color: "white",
  },
  time: {
    fontSize: 11,
    color: "#777",
    marginTop: 2,
    alignSelf: "flex-end",
  },
  mineTime: {
    color: "rgba(255,255,255,0.75)",
  },
});