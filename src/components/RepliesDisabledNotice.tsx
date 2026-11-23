import { Text, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  onUnlock: () => void;
};

export default function RepliesDisabledNotice({ onUnlock }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      onLongPress={onUnlock}
      delayLongPress={800}
      style={[styles.wrap, { paddingBottom: 14 + insets.bottom }]}
    >
      <Text style={styles.text}>
        {"Sender can't accept replies. Contact them directly. "}
        <Text style={styles.link}>Learn more</Text>
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 24,
    paddingTop: 14,
    backgroundColor: "white",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ddd",
  },
  text: {
    textAlign: "center",
    fontSize: 13,
    color: "#777",
  },
  link: {
    color: "#4F8EF7",
  },
});