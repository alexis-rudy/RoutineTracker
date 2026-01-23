import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Task from "./Task";

export default function TaskList() {

    const [tasks, setTasks] = useState([]);

    // Load tasks when the component mounts
    useEffect(() => {
        const data = require("../data/morning-tasks.json");
        setTasks(data);
    }, []);

    // Remove task from the list
    function removeTask(tasks, index) {
        
    };
    

    return (
        <>
            <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 10 }}>Current Tasks</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                {tasks.map((task, index) => (
                    <Task key={index} task={task}  />))}
            </View>
        </>
    )
}