import { useEffect, useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useKeyboardHeight } from "../components/hooks/useKeyboardHeight";

type Props = {
  onSend: (text: string) => void;
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
  const insets = useSafeAreaInsets();
  const keyboardHeight = useKeyboardHeight();
  const isEditing = editingText !== null;
  const canSend = !disabled && text.trim().length > 0;

  // When edit mode starts, put the message text into the input
  useEffect(() => {
    if (editingText !== null) setText(editingText);
  }, [editingText]);

  const handleSend = () => {
    if (!canSend) return;
    onSend(text.trim());
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
      {isEditing && (
        <View style={styles.editBanner}>
          <Text style={styles.editLabel}>Editing message</Text>
          <Pressable onPress={handleCancel}>
            <Text style={styles.cancel}>Cancel</Text>
          </Pressable>
        </View>
      )}
      <View style={styles.row}>
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
  sendDisabled: {
    opacity: 0.4,
  },
  sendText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});