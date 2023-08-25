import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InitialsAvatar = ({ firstName, lastName }) => {
  // Assuming you want to show the first letter of the first name and last name
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  return (
    <View style={styles.avatarContainer}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007bff", // You can set your desired background color
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white", // You can set your desired text color
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default InitialsAvatar;
