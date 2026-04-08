import { useState, useEffect } from "react";
import {
  View,
  Modal,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import {
  addCalorieEntry,
  listenToCalorieEntries,
  deleteCalorieEntry,
} from "../data/firebaseService";

export default function CalorieModal({ visible, onClose }) {
  const [mealName, setMealName] = useState("");
  const [calorieAmount, setCalorieAmount] = useState("");
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate totals
  const totalCalories = entries.reduce(
    (sum, entry) => sum + (entry.calories || 0),
    0,
  );
  const dailyLimit = 2000; // Configurable daily calorie target
  const remainingCalories = dailyLimit - totalCalories;

  // Subscribe to calorie entries
  useEffect(() => {
    const unsubscribe = listenToCalorieEntries(setEntries);
    return () => unsubscribe();
  }, []);

  async function handleAddMeal() {
    // Validation
    if (!mealName.trim()) {
      setError("Please enter a meal name");
      return;
    }
    if (!calorieAmount.trim() || isNaN(calorieAmount)) {
      setError("Please enter a valid calorie amount");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await addCalorieEntry(mealName.trim(), Number(calorieAmount));
      // Clear inputs
      setMealName("");
      setCalorieAmount("");
    } catch (err) {
      setError("Failed to add meal. Try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteEntry(entryId) {
    try {
      await deleteCalorieEntry(entryId);
    } catch (err) {
      Alert.alert("Error", "Failed to delete entry");
      console.error(err);
    }
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Add Meal</Text>
            <Pressable onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </Pressable>
          </View>

          {/* Input Section */}
          <View style={styles.inputSection}>
            <TextInput
              style={styles.input}
              placeholder="Meal Name"
              placeholderTextColor="#999"
              value={mealName}
              onChangeText={setMealName}
              editable={!isLoading}
            />
            <TextInput
              style={styles.input}
              placeholder="Calories"
              placeholderTextColor="#999"
              value={calorieAmount}
              onChangeText={setCalorieAmount}
              keyboardType="numeric"
              editable={!isLoading}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Pressable
              style={[styles.addButton, isLoading && styles.addButtonDisabled]}
              onPress={handleAddMeal}
              disabled={isLoading}>
              <Text style={styles.addButtonText}>
                {isLoading ? "Adding..." : "Add Meal"}
              </Text>
            </Pressable>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Total Consumed</Text>
              <Text style={styles.statValue}>{totalCalories}</Text>
              <Text style={styles.statUnit}>kcal</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Remaining</Text>
              <Text
                style={[
                  styles.statValue,
                  remainingCalories < 0 && styles.statValueOver,
                ]}>
                {remainingCalories}
              </Text>
              <Text style={styles.statUnit}>kcal</Text>
            </View>
          </View>

          {/* Entries List */}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(7, 11, 22, 0.8)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#070B16",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    maxHeight: "90%",
    borderTopWidth: 1,
    borderTopColor: "rgba(164, 218, 255, 0.28)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  closeButton: {
    fontSize: 24,
    color: "#A4DAFF",
    fontWeight: "300",
  },
  inputSection: {
    gap: 12,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(164, 218, 255, 0.14)",
    paddingBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(164, 218, 255, 0.28)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#FFFFFF",
    fontSize: 14,
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 12,
    marginTop: -8,
  },
  addButton: {
    backgroundColor: "#84FFDA",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  addButtonDisabled: {
    opacity: 0.6,
  },
  addButtonText: {
    color: "#0C2B32",
    fontWeight: "700",
    fontSize: 15,
  },
  statsSection: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(164, 218, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(164, 218, 255, 0.24)",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  statLabel: {
    color: "#B4D8FF",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  statValue: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },
  statValueOver: {
    color: "#FF6B6B",
  },
  statUnit: {
    color: "#A4DAFF",
    fontSize: 10,
    marginTop: 4,
  },
  entriesSection: {
    flex: 1,
    gap: 8,
  },
  entriesTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#B4D8FF",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  entryList: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(164, 218, 255, 0.14)",
    padding: 8,
  },
  entryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "rgba(164, 218, 255, 0.08)",
    marginBottom: 8,
  },
  entryContent: {
    flex: 1,
  },
  entryName: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  entryCalories: {
    color: "#A4DAFF",
    fontSize: 12,
    marginTop: 2,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(255, 107, 107, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#FF6B6B",
    fontSize: 20,
    fontWeight: "300",
  },
  emptyText: {
    color: "#A4DAFF",
    fontSize: 13,
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 12,
  },
});
