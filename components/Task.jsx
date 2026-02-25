import { Pressable, Text, View, StyleSheet } from "react-native";

export default function Task({ task, onComplete }) {
  const label = typeof task === "string" ? task : task?.title;

  return (
    <>
      <Pressable onPress={onComplete} style={styles.task}>
        <Text>{label}</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  task: {
    padding: 30,
    backgroundColor: "lightblue",
    borderRadius: 5,
    margin: 10,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center"
  }
});
