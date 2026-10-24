import { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboardHeight } from "../components/hooks/useKeyboardHeight";

type Props = {
  onSend: (text: string) => void;
};

export default function ComposeBar({ onSend }: Props) {
  const [text, setText] = useState("");
  const insets = useSafeAreaInsets();
  const keyboardHeight = useKeyboardHeight();
  const canSend = text.trim().length > 0;

  const handleSend = () => {
    if (!canSend) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <View
      style={[
        styles.bar,
        { paddingBottom: 8 + keyboardHeight + insets.bottom },
      ]}
    >
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Text message"
        multiline
      />
      <Pressable
        style={[styles.sendButton, !canSend && styles.sendDisabled]}
        onPress={handleSend}
        disabled={!canSend}
      >
        <Text style={styles.sendText}>Send</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 8,
    paddingTop: 8,
    backgroundColor: "white",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    maxHeight: 120,
    backgroundColor: "#F1F1F3",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "#4F8EF7",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sendDisabled: {
    opacity: 0.4,
  },
  sendText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
