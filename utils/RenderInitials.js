import React from "react";
import { Image } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
function RenderInitials({ initials, imageUrl }) {
  // Check if an image URL is provided

  if (imageUrl) {
    return (
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          marginRight: 10,
        }}
        onError={(error) => {
          console.error("Image loading error:", error);
        }}
      />
    );
  }
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
