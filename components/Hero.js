import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Hero = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>Little Lemon</Text>
        <Text style={styles.subHeader}>Chicago</Text>
        <Text style={styles.body}>
          We are a family owned Mediterranean restaurant, focused on traditional
          receipes served with a modern twist.
        </Text>
      </View>

      <Image
        source={require("../assets/Hero_image.png")}
        style={styles.heroImage}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    backgroundColor: "#495E57",
    flexDirection: "row",
  },

  textContainer: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    fontSize: 45,
    color: "#F4CE14",
    marginLeft: 15,
    marginTop: 10,
    width: 300,
    //fontFamily: "MarkaziText",
  },
  subHeader: {
    fontSize: 40,
    color: "#EDEFEE",
    marginLeft: 15,
    marginBottom: 20,
    // fontFamily: "MarkaziText",
  },
  body: {
    fontSize: 18,
    color: "#EDEFEE",
    marginLeft: 15,
    width: 190,
    height: 140,
  },
  //   imageContainer: {
  //     justifyContent: "flex-end",
  //     alignItems: "flex-end", // Align the content to the right side
  //     marginTop: 20,
  //     flex: 1, // Make it flexible to occupy available space
  //   },
  heroImage: {
    height: 190,
    width: 190,
    resizeMode: "contain",
    borderRadius: 8,
    marginTop: 80,
    marginRight: 15, // Adjust the margin to position it to the right
  },
});
export default Hero;
