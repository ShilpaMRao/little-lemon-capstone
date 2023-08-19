import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>Little Lemon</Text>
        <Text style={styles.subHeader}>Chicago</Text>
        <Text style={styles.body}>We are a family owned</Text>
        <Text style={styles.body}>Mediterranean restaurant,</Text>
        <Text style={styles.body}>focused on traditional</Text>
        <Text style={styles.body}>receipes served with a </Text>
        <Text style={styles.body}>modern twist.</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("C:/Users/Admin/Shilpa/Coursera/little-lemon-capstone/assets/Hero_image.png")}
          style={styles.heroImage}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.45,
    backgroundColor: "#495E57",
    flexDirection: "row",
  },
  header: {
    fontSize: 45,
    color: "#F4CE14",
    marginLeft: 15,
    marginTop: 10,
  },
  subHeader: {
    fontSize: 40,
    color: "#EDEFEE",
    marginLeft: 15,
    marginBottom: 20,
  },
  body: {
    fontSize: 15,
    color: "#EDEFEE",
    marginLeft: 15,
  },
  imageContainer: {
    flex: 1,
  },
  heroImage: {
    height: 140,
    width: 140,
    resizeMode: "contain",
    borderRadius: 8,
    marginTop: 100,
  },
});

export default Home;
