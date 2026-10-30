import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useChat } from "../context/ChatContext";

export default function EditContactScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { conversations, updateContact } = useChat();
  const conversation = conversations.find((c) => c.id === id);

  const [name, setName] = useState(conversation?.name ?? "");
  const [phone, setPhone] = useState(conversation?.phone ?? "");

  if (!conversation) {
    return (
      <View style={styles.container}>
        <Text>Conversation not found</Text>
      </View>
    );
  }

  const canSave = phone.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    updateContact(conversation.id, name, phone);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Contact name"
      />

      <Text style={styles.label}>Phone number</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone number"
        keyboardType="phone-pad"
      />

      <Pressable
        style={[styles.saveButton, !canSave && styles.saveDisabled]}
        onPress={handleSave}
        disabled={!canSave}
      >
        <Text style={styles.saveText}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#F1F1F3",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#4F8EF7",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 28,
  },
  saveDisabled: {
    opacity: 0.4,
  },
  saveText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});