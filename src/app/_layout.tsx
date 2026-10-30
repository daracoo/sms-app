import { Stack } from "expo-router";
import { ChatProvider } from "../context/ChatContext";

export default function RootLayout() {
  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Messages" }} />
        <Stack.Screen name="new" options={{ title: "New message" }} />
        <Stack.Screen name="edit-contact" options={{ title: "Edit contact" }} />
      </Stack>
    </ChatProvider>
  );
}