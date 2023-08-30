import React from "react";
import { View } from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";

const GreenCircleBackButton = (props) => {
  return (
    <View
      style={{
        backgroundColor: "green",
        borderRadius: 30, // Make it large enough to encircle the arrow
        width: 40, // Adjust the size as needed
        height: 40, // Adjust the size as needed
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10, // Adjust the margin as needed
      }}
    >
      <HeaderBackButton {...props} tintColor="white" />
    </View>
  );
};

export default GreenCircleBackButton;
