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
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <ImageBackground
        source={require("../assets/images/space_bg.jpeg")}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.overlay}>
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>Routine Tracker</Text>
            <Text style={styles.title}>Hello, Alexis</Text>
            <Text style={styles.subtitle}>
              Build momentum with small wins and playful focus.
            </Text>
          </View>

          <View style={styles.surface}>
            <TaskList />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    minHeight: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(7, 11, 22, 0.62)",
    paddingHorizontal: 22,
    paddingTop: 56,
    paddingBottom: 36,
    gap: 22,
  },
  hero: {
    gap: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.24)",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "#B4D8FF",
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#DDEAFE",
  },
  surface: {
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: "rgba(7, 16, 35, 0.76)",
    borderWidth: 1,
    borderColor: "rgba(164, 218, 255, 0.28)",
  },
});
