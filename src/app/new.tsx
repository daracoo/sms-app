import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import ComposeBar from "../components/ComposeBar";
import { useChat } from "../context/ChatContext";

export default function NewMessageScreen() {
  const router = useRouter();
  const { startConversation } = useChat();
  const [phone, setPhone] = useState("");

  const handleSend = (text: string) => {
    const id = startConversation(phone, text);
    router.replace({ pathname: "/chat/[id]", params: { id } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.toRow}>
        <Text style={styles.toLabel}>To:</Text>
        <TextInput
          style={styles.toInput}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone number"
          keyboardType="phone-pad"
          autoFocus
        />
      </View>
      <View style={styles.spacer} />
      <ComposeBar onSend={handleSend} disabled={phone.trim().length === 0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  toRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
  },
  toLabel: {
    fontSize: 16,
    color: "#888",
    marginRight: 8,
  },
  toInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
  },
  spacer: {
    flex: 1,
  },
});