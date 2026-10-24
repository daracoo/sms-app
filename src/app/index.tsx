import { FlatList, View, Pressable, Text, StyleSheet } from "react-native";
import { Link, Stack } from "expo-router";
import ConversationItem from "../components/ConversationItem";
import { useChat } from "../context/ChatContext";

export default function Index() {
  const { conversations } = useChat();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href="/new" asChild>
              <Pressable>
                <Text style={styles.headerButton}>New</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ConversationItem conversation={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ddd",
    marginLeft: 76,
  },
  headerButton: {
    color: "#4F8EF7",
    fontSize: 16,
    fontWeight: "600",
  },
});