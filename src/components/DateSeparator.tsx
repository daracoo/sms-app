import { View, Text, StyleSheet } from "react-native";

type Props = {
  label: string;
};

export default function DateSeparator({ label }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    marginVertical: 12,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888",
  },
});