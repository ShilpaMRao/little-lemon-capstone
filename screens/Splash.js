import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("C:/Users/Admin/Shilpa/Coursera/little-lemon-capstone/assets/Logo.png")}
        style={styles.logo}
      />
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default SplashScreen;
