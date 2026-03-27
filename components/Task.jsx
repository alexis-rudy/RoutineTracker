import { Pressable, StyleSheet, Text } from "react-native";

export default function Task({ task, onComplete, completed = false }) {
  const label = typeof task === "string" ? task : task?.title;

  return (
    <Pressable
      onPress={onComplete}
      disabled={completed}
      style={({ pressed }) => [
        styles.task,
        completed ? styles.taskCompleted : null,
        pressed && !completed ? styles.taskPressed : null,
      ]}>
      <Text style={[styles.label, completed ? styles.labelCompleted : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  task: {
    paddingHorizontal: 14,
    paddingVertical: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    margin: 4,
    width: "47%",
    minHeight: 118,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D8E5F5",
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  taskPressed: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.08,
  },
  taskCompleted: {
    backgroundColor: "#DDFDF4",
    borderColor: "#8EEECB",
    opacity: 0.86,
  },
  label: {
    color: "#1F2A44",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 22,
  },
  labelCompleted: {
    color: "#1E5C4A",
  },
});
