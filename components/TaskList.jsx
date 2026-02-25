import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Task from "./Task";

export default function TaskList() {
  const [unfinishedTasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Load tasks when the component mounts
  useEffect(() => {
    const data = require("../data/morning-tasks.json");
    setTasks(data);
  }, []);

  return (
    <>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Current Tasks</Text>
        <View style={styles.container}>
          {unfinishedTasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              onComplete={() => {
                setTasks((prevState) => {
                  // Add the completed task to the completedTasks state
                  setCompletedTasks((prevCompleted) => [...prevCompleted, task]);
                  return prevState.filter((_, i) => i !== index);
                });
              }}
            />
          ))}
        </View>
        <View style={styles.container}>
          <Pressable onPress={hideTasks}>
            <Text style={styles.title}>Completed Tasks</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

function hideTasks() {
  return null;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: "white",
  },
  container: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
