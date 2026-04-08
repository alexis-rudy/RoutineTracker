import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { seedTaskCollections } from "../data/firebase-config";
import {
    listenToCompletedTasks,
    listenToUnfinishedTasks,
    updateTaskStatus,
} from "../data/firebaseService";
import Task from "./Task";

const COLLECTION_NAME = "morning_tasks";

export default function TaskList() {
  const [unfinishedTasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState("");

  // Subscribe to Firestore tasks when the component mounts
  useEffect(() => {
    // Subscribe to unfinished tasks
    const unsubscribeUnfinished = listenToUnfinishedTasks(
      COLLECTION_NAME,
      setTasks,
    );

    // Subscribe to completed tasks
    const unsubscribeCompleted = listenToCompletedTasks(
      COLLECTION_NAME,
      setCompletedTasks,
    );

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeUnfinished();
      unsubscribeCompleted();
    };
  }, []);

  const totalTasks = unfinishedTasks.length + completedTasks.length;

  async function handleSeedPress() {
    if (isSeeding) {
      return;
    }

    setIsSeeding(true);
    setSeedMessage("");

    try {
      const results = await seedTaskCollections();
      const totalSeeded = Object.values(results).reduce(
        (sum, count) => sum + Number(count || 0),
        0,
      );
      setSeedMessage(`Seeded ${totalSeeded} records to Firestore.`);
    } catch (error) {
      setSeedMessage("Seeding failed. Check console/Firebase permissions.");
    } finally {
      setIsSeeding(false);
    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTag}>Morning Plan</Text>
        <Text style={styles.counter}>
          {completedTasks.length}/{totalTasks || 0} done
        </Text>
      </View>

      <View style={styles.seedArea}>
        <Pressable
          onPress={handleSeedPress}
          disabled={isSeeding}
          style={({ pressed }) => [
            styles.seedButton,
            pressed ? styles.seedButtonPressed : null,
            isSeeding ? styles.seedButtonDisabled : null,
          ]}>
          <Text style={styles.seedButtonText}>
            {isSeeding ? "Seeding..." : "Seed Firebase"}
          </Text>
        </Pressable>
        {seedMessage ? (
          <Text style={styles.seedMessage}>{seedMessage}</Text>
        ) : null}
      </View>

      <View style={styles.block}>
        <Text style={styles.title}>Current Tasks</Text>
        <View style={styles.container}>
          {unfinishedTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onComplete={() => {
                updateTaskStatus(COLLECTION_NAME, task.id, true);
              }}
            />
          ))}
          {unfinishedTasks.length === 0 ? (
            <Text style={styles.empty}>All clear. Nice work.</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.block}>
        <Text style={styles.title}>Completed Tasks</Text>
        <View style={styles.container}>
          {completedTasks.length === 0 ? (
            <Text style={styles.empty}>
              Complete a task to celebrate progress.
            </Text>
          ) : (
            completedTasks.map((task) => (
              <Task key={task.id} task={task} completed />
            ))
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTag: {
    backgroundColor: "rgba(132, 255, 218, 0.16)",
    color: "#95F3D6",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(132, 255, 218, 0.4)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  counter: {
    color: "#C2D8F5",
    fontSize: 13,
    fontWeight: "600",
  },
  block: {
    gap: 12,
  },
  seedArea: {
    gap: 8,
    alignItems: "flex-start",
  },
  seedButton: {
    backgroundColor: "#84FFDA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#60D8B5",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  seedButtonPressed: {
    transform: [{ scale: 0.98 }],
  },
  seedButtonDisabled: {
    opacity: 0.72,
  },
  seedButtonText: {
    color: "#0C2B32",
    fontWeight: "700",
    fontSize: 14,
  },
  seedMessage: {
    color: "#D2DDF0",
    fontSize: 13,
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
    gap: 8,
  },
  empty: {
    width: "100%",
    color: "#D2DDF0",
    fontSize: 15,
    fontStyle: "italic",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
});
