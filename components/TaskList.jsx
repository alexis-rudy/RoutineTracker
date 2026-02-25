import { useEffect, useState } from "react";
import { ScrollView, Text, View, Button } from "react-native";
import Task from "./Task";

export default function TaskList() {
  const [unfinishedTasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Load tasks when the component mounts
  useEffect(() => {
    const data = require("../data/morning-tasks.json");
    setTasks(data);
    // console.log(data);
  }, []);

  return (
    <>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 10 }}>
          Current Tasks
        </Text>
        {/* <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}></View> */}
        <View style={{ marginTop: 20, flexDirection: "row", flexWrap: "wrap" }}>
            {unfinishedTasks.map((task, index) => (
              <Task
                key={index}
                task={task}
                onComplete={() => {
                  // task.done = true;
                  setTasks((prevState) => {
                    // task.done = true;
                    // console.log(prevState.filter(task => task.done));
                    return prevState.filter((_, i) => i !== index);                  });
                }}
              />)
            )}
        </View>
      </View>
    </>
  );
  
}

