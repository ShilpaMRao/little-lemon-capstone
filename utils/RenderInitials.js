import React from "react";
import { Text } from "react-native";
import { View } from "react-native";
function RenderInitials({ initials }) {
  const inUpperCaseInitials = initials.toUpperCase();
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#495E57", // Background color of the avatar
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
      }}
    >
      <Text style={{ fontSize: 20, color: "#FFFFFF" }}>
        {inUpperCaseInitials}
      </Text>
    </View>
  );
}
export default RenderInitials;
