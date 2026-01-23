import { Button, Text, View } from "react-native";

export default function Task({ task, onComplete }) {
  const label = typeof task === "string" ? task : task?.title;

  return (
    <View
      style={{ padding: 30, backgroundColor: "lightblue", borderRadius: 5, margin: 10, width: 150, height: 150, justifyContent: "center", alignItems: "center" }}>
      <Button title={label} onPress={onComplete} />
    </View>
  );
}
