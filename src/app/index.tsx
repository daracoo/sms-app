import { FlatList, View, StyleSheet } from "react-native";
import ConversationItem from "../components/ConversationItem";
import { conversations } from "../data/conversations";

export default function Index() {
  return (
    <FlatList
      data={conversations}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ConversationItem conversation={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ddd",
    marginLeft: 76,
  },
});