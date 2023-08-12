import React, { useState } from "react";
import { validateEmail } from "../utils";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const Onboarding = () => {
  const [email, setEmail] = useState("");

  const handleNext = () => {
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.img}
        source={require("C:/Users/Admin/Shilpa/Coursera/little-lemon-capstone/assets/Logo.png")}
        resizeMode="contain"
        accessible={true}
        accessibilityLabel="Little Lemon Logo"
      />
      <Text style={styles.introText}>Let us get to know you</Text>
      <Text style={styles.text}>First Name</Text>
      <TextInput style={styles.textInput} />
      <Text style={styles.text}>Last Name</Text>
      <TextInput style={styles.textInput} />
      <Text
        style={styles.text}
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      >
        Email
      </Text>
      <TextInput
        style={styles.textInput}
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <Pressable onPress={handleNext}>
        <Text style={styles.button}>Next</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: 150,
    width: 350,
  },
  introText: {
    padding: 10,
    // fontFamily: "Markazi",
    fontSize: 30,
    fontWeight: "bold",
    color: "#495E57",
    textAlign: "center",
    marginVertical: 40,
  },
  text: {
    padding: 10,
    // fontFamily: "Markazi",
    fontSize: 20,
    fontWeight: "bold",
    color: "#495E57",
  },
  textInput: {
    padding: 10,
    height: 50,
    width: 350,
    borderRadius: 8,
    // fontFamily: "MarkaziText-Regular",
    borderWidth: 1,
    borderColor: "#495E57",
    fontSize: 20,
  },
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
});
export default Onboarding;
