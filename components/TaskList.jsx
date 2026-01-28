import { useEffect, useState } from "react";
import { ScrollView, Text, View, Button } from "react-native";
import Task from "./Task";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  // Load tasks when the component mounts
  useEffect(() => {
    const data = require("../data/morning-tasks.json");
    setTasks(data);
    console.log(data);
  }, []);

  // Remove task from the list
  function removeTask(tasks, index) {}

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "red" }}>
        <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 10 }}>
          Current Tasks
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}></View>
        <View style={{ marginTop: 20, flexDirection: "row", flexWrap: "wrap" }}>
          {/* <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}> */}
            {tasks.map((task, index) => (
              <Task
                key={index}
                task={task}
                onComplete={() => {
                  task.done = true;
                }}
              />
            ))}
          {/* </ScrollView> */}
        </View>
      </View>
    </>
  );
  
}

