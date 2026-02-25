import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import TaskList from "../components/TaskList";

export default function Home() {
  return (
    <ScrollView>
      <ImageBackground
        source={require("../assets/images/space_bg.jpeg")}
        resizeMode="cover">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}>
          <Text style={styles.text}>Hello, Alexis</Text>
        </View>
        <View style={{ flexDirection: "column", padding: 20 }}>
          <TaskList />
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: "white",
  }
});
