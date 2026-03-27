import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Task from "./Task";

export default function TaskList() {
  const [unfinishedTasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Load tasks when the component mounts
  useEffect(() => {
    const data = require("../data/morning-tasks.json");
    setTasks(data);
  }, []);

  const totalTasks = unfinishedTasks.length + completedTasks.length;
  const progress = totalTasks === 0 ? 0 : completedTasks.length / totalTasks;
  const progressWidth = `${Math.round(progress * 100)}%`;

  return (
    <View style={styles.root}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTag}>Morning Plan</Text>
        <Text style={styles.counter}>
          {completedTasks.length}/{totalTasks || 0} done
        </Text>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: progressWidth }]} />
      </View>

      <View style={styles.block}>
        <Text style={styles.title}>Current Tasks</Text>
        <View style={styles.container}>
          {unfinishedTasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              onComplete={() => {
                setTasks((prevState) => {
                  setCompletedTasks((prevCompleted) => [...prevCompleted, task]);
                  return prevState.filter((_, i) => i !== index);
                });
              }}
            />
          ))}
          {unfinishedTasks.length === 0 ? (
            <Text style={styles.empty}>All clear. Nice work.</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.block}>
        <Text style={styles.title}>Completed Tasks</Text>
        <View style={styles.container}>
          {completedTasks.length === 0 ? (
            <Text style={styles.empty}>Complete a task to celebrate progress.</Text>
          ) : (
            completedTasks.map((task, index) => (
              <Task key={`completed-${index}`} task={task} completed />
            ))
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTag: {
    backgroundColor: "rgba(132, 255, 218, 0.16)",
    color: "#95F3D6",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(132, 255, 218, 0.4)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  counter: {
    color: "#C2D8F5",
    fontSize: 13,
    fontWeight: "600",
  },
  progressTrack: {
    width: "100%",
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#84FFDA",
  },
  block: {
    gap: 12,
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
    gap: 8,
  },
  empty: {
    width: "100%",
    color: "#D2DDF0",
    fontSize: 15,
    fontStyle: "italic",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
});
