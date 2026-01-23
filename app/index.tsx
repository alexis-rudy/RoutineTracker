import { Text, View , ScrollView} from "react-native";
import TaskList from "../components/TaskList"

export default function Home() {
  return (
    <ScrollView>
      <View style={{
        flexDirection: "row"
      }}>
        <Text style={{ fontSize: 35 }}>Hello, Alexis</Text>
      </View>
      <View style={{ flexDirection: "column", padding: 20 }}>
        <TaskList />
      </View>
    </ScrollView>
  );
}
