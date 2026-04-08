import {
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <ImageBackground
        source={require("../assets/images/space_bg.jpeg")}
        resizeMode="cover"
        style={styles.background}>
        <View style={styles.menuContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.menuButton,
              pressed && styles.menuButtonPressed,
            ]}
            onPress={() => router.push("/tabs")}>
            <Text style={styles.menuButtonTitle}>Routine Tracker</Text>
            <Text style={styles.menuButtonSubtitle}>Open daily task board</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.menuButton,
              pressed && styles.menuButtonPressed,
            ]}
            onPress={() => router.push("/tabs/calories")}>
            <Text style={styles.menuButtonTitle}>Calorie Tracker</Text>
            <Text style={styles.menuButtonSubtitle}>Log meals and totals</Text>
          </Pressable>
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
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  menuContainer: {
    gap: 14,
  },
  menuButton: {
    backgroundColor: "rgba(7, 16, 35, 0.84)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(164, 218, 255, 0.34)",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  menuButtonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  menuButtonTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
  menuButtonSubtitle: {
    color: "#B4D8FF",
    fontSize: 13,
    marginTop: 4,
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
