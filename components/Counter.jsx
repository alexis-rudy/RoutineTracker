import { useEffect, useState } from "react";
import { View, Text } from "react-native";

const [calories, setCalories] = useState([]);

export default function Counter() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>{calories}</Text>
        </View>
    )
}