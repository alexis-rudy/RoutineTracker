import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import CalorieModal from "../../components/CalorieModal";
import {
  deleteCalorieEntry,
  listenToCalorieEntries,
} from "../../data/firebaseService";

type CalorieEntry = {
  id: string;
  mealName: string;
  calories: number;
};

export default function Calories() {
  const [modalVisible, setModalVisible] = useState(false);
  const [entries, setEntries] = useState<CalorieEntry[]>([]);

  const calorieGoal = 2000;
  const caloriesConsumed = entries.reduce(
    (sum, entry) => sum + (entry.calories || 0),
    0,
  );
  const remainingCalories = calorieGoal - caloriesConsumed;

  // Subscribe to calorie entries
  useEffect(() => {
    const unsubscribe = listenToCalorieEntries(setEntries);
    return () => unsubscribe();
  }, []);

  async function handleDeleteEntry(entryId: string) {
    try {
      await deleteCalorieEntry(entryId);
    } catch (error) {
      console.error("Failed to delete calorie entry:", error);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.cardSection}>
          <View style={styles.card}>
            <Text style={styles.label}>Calorie Goal</Text>
            <Text style={styles.value}>{calorieGoal}</Text>
            <Text style={styles.unit}>kcal</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Consumed</Text>
            <Text style={styles.value}>{caloriesConsumed}</Text>
            <Text style={styles.unit}>kcal</Text>
          </View>

          <View style={[styles.card, remainingCalories < 0 && styles.cardOver]}>
            <Text style={styles.label}>Remaining</Text>
            <Text
              style={[styles.value, remainingCalories < 0 && styles.valueOver]}>
              {remainingCalories}
            </Text>
            <Text style={styles.unit}>kcal</Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Add Meal</Text>
        </Pressable>

        <View style={styles.entriesSection}>
          <Text style={styles.entriesTitle}>Today's Meals</Text>
          <ScrollView style={styles.entryList}>
            {entries.length === 0 ? (
              <Text style={styles.emptyText}>No meals logged yet</Text>
            ) : (
              entries.map((entry) => (
                <View key={entry.id} style={styles.entryItem}>
                  <View style={styles.entryContent}>
                    <Text style={styles.entryName}>{entry.mealName}</Text>
                    <Text style={styles.entryCalories}>
                      {entry.calories} kcal
                    </Text>
                  </View>
                  <Pressable
                    style={({ pressed }) => [
                      styles.deleteButton,
                      pressed && styles.deleteButtonPressed,
                    ]}
                    onPress={() => handleDeleteEntry(entry.id)}>
                    <Text style={styles.deleteButtonText}>-</Text>
                  </Pressable>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>

      <CalorieModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070B16",
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 32,
    justifyContent: "center",
    gap: 28,
  },
  cardSection: {
    gap: 12,
  },
  card: {
    backgroundColor: "rgba(164, 218, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(164, 218, 255, 0.24)",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 16,
    alignItems: "center",
    gap: 4,
  },
  cardOver: {
    borderColor: "rgba(255, 107, 107, 0.24)",
    backgroundColor: "rgba(255, 107, 107, 0.08)",
  },
  label: {
    color: "#B4D8FF",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  value: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "800",
  },
  valueOver: {
    color: "#FF6B6B",
  },
  unit: {
    color: "#A4DAFF",
    fontSize: 11,
  },
  addButton: {
    backgroundColor: "#84FFDA",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  addButtonPressed: {
    transform: [{ scale: 0.98 }],
  },
  addButtonText: {
    color: "#0C2B32",
    fontWeight: "700",
    fontSize: 16,
  },
  entriesSection: {
    flex: 1,
    gap: 10,
  },
  entriesTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#B4D8FF",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  entryList: {
    flex: 1,
    backgroundColor: "rgba(164, 218, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(164, 218, 255, 0.18)",
    borderRadius: 14,
    padding: 10,
  },
  entryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(164, 218, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  entryContent: {
    gap: 2,
  },
  entryName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  entryCalories: {
    color: "#B4D8FF",
    fontSize: 12,
  },
  emptyText: {
    color: "#C2D8F5",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 20,
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 107, 107, 0.16)",
    borderWidth: 1,
    borderColor: "rgba(255, 107, 107, 0.32)",
  },
  deleteButtonPressed: {
    transform: [{ scale: 0.94 }],
  },
  deleteButtonText: {
    color: "#FF8A8A",
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "700",
  },
});
