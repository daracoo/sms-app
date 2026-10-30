import { useEffect, useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboardHeight } from "../components/hooks/useKeyboardHeight";
import { Message } from "../data/message";

type Sender = Message["sender"];

type Props = {
  onSend: (text: string, sender: Sender) => void;
  disabled?: boolean;
  editingText?: string | null;
  onCancelEdit?: () => void;
};

export default function ComposeBar({
  onSend,
  disabled = false,
  editingText = null,
  onCancelEdit,
}: Props) {
  const [text, setText] = useState("");
  const [sender, setSender] = useState<Sender>("me");
  const insets = useSafeAreaInsets();
  const keyboardHeight = useKeyboardHeight();
  const isEditing = editingText !== null;
  const canSend = !disabled && text.trim().length > 0;

  useEffect(() => {
    if (editingText !== null) setText(editingText);
  }, [editingText]);

  const handleSend = () => {
    if (!canSend) return;
    onSend(text.trim(), sender);
    setText("");
  };

  const handleCancel = () => {
    setText("");
    onCancelEdit?.();
  };

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: 8 + keyboardHeight + insets.bottom },
      ]}
    >
      {isEditing ? (
        <View style={styles.editBanner}>
          <Text style={styles.editLabel}>Editing message</Text>
          <Pressable onPress={handleCancel}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.senderRow}>
          <Text style={styles.senderLabel}>Send as:</Text>
          <Pressable
            style={[styles.chip, sender === "me" && styles.chipMe]}
            onPress={() => setSender("me")}
          >
            <Text
              style={[
                styles.chipText,
                sender === "me" && styles.chipTextActive,
              ]}
            >
              Me
            </Text>
          </Pressable>
          <Pressable
            style={[styles.chip, sender === "them" && styles.chipThem]}
            onPress={() => setSender("them")}
          >
            <Text
              style={[
                styles.chipText,
                sender === "them" && styles.chipTextActive,
              ]}
            >
              Them
            </Text>
          </Pressable>
        </View>
      )}

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder={
            !isEditing && sender === "them"
              ? "Message from them"
              : "Text message"
          }
          multiline
        />
        <Pressable
          style={[
            styles.sendButton,
            !isEditing && sender === "them" && styles.sendThem,
            !canSend && styles.sendDisabled,
          ]}
          onPress={handleSend}
          disabled={!canSend}
        >
          <Text style={styles.sendText}>{isEditing ? "Save" : "Send"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 8,
    backgroundColor: "white",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ddd",
  },
  editBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  editLabel: {
    color: "#888",
    fontSize: 14,
  },
  cancel: {
    color: "#4F8EF7",
    fontSize: 14,
    fontWeight: "600",
  },
  senderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  senderLabel: {
    color: "#888",
    fontSize: 14,
    marginRight: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: "#F1F1F3",
    marginRight: 6,
  },
  chipMe: {
    backgroundColor: "#4F8EF7",
  },
  chipThem: {
    backgroundColor: "#8E8E93",
  },
  chipText: {
    fontSize: 14,
    color: "#555",
  },
  chipTextActive: {
    color: "white",
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
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
  sendThem: {
    backgroundColor: "#8E8E93",
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
