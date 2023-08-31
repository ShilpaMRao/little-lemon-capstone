import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons"; // You might need to install this library

const GreenCircleBackButton = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    // Handle the back press here
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleBackPress}>
      <View
        style={{
          backgroundColor: "#495E57",
          borderRadius: 30,
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 10,
        }}
      >
        {/* <AntDesign name="arrowleft" size={24} color="white" /> */}
      </View>
    </TouchableOpacity>
  );
};

export default GreenCircleBackButton;
