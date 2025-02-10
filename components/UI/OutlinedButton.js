import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

function OutlinedButton({ onPress, icon, children, textColor }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons style={styles.icon} name={icon} size={22} />
      <Text style={[styles.text, textColor && { color: textColor }]}>
        {children}
      </Text>
    </Pressable>
  );
}

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 8,
    color: Colors.primary500,
  },
  text: {
    color: Colors.primary500,
    fontSize: 18,
    fontWeight: "bold",
  },
});
