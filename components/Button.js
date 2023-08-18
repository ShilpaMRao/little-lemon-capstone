import * as React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const Button = ({ onPress, children, disabled, style, textColor }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[disabled && styles.disabled, style]}
      disabled={disabled}
    >
      <Text style={[styles.text, textColor && { color: textColor }]}>
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 200,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#495E57",
    color: "#EEFEEF",
    fontSize: 25,
    textAlign: "center",
    marginLeft: 150,
    marginVertical: 40,
  },
  disabled: {
    backgroundColor: "grey",
    opacity: 0.5,
  },
  text: {
    fontSize: 20,
    color: "white",
    alignSelf: "center",
  },
  changeButton: {
    height: 50,
    width: 100,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#495E57",
    color: "#EEFEEF",
    fontSize: 25,
    textAlign: "center",
    marginLeft: 10,
    marginVertical: 40,
  },
  removeButton: {
    height: 50,
    width: 100,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#EEFEEE",
    color: "#495E57",
    fontSize: 25,
    textAlign: "center",
    marginLeft: 150,
    marginVertical: 40,
  },
});

export default Button;
