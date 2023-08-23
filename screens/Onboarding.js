import React, { useState } from "react";
import { validateEmail, validateName } from "../utils";
import Button from "../components/Button";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "./Profile";

const Onboarding = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const isEmailValid = validateEmail(email);
  const isFirstNameValid = validateName(firstName);
  const isLastNameValid = validateName(lastName);
  // const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const isFormValid = () => isEmailValid && isFirstNameValid && isLastNameValid;

  const handleNext = async () => {
    // When onboarding is completed
    console.log("In Handle Next");
    try {
      await AsyncStorage.setItem("isOnboardingComplete", "true");
      setIsOnboardingComplete(true);
      // Navigate to the Profile screen
      console.log(
        "If isOnboardingComplete, navigate to profile screen:",
        isOnboardingComplete
      );
      const profileData = {};
      if (firstName) profileData.firstName = firstName;
      if (lastName) profileData.lastName = lastName;
      if (email) profileData.email = email;

      navigation.navigate("Profile", profileData);
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (error) {
      console.error("Error setting onboarding status in Onboarding.js:", error);
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
      <TextInput
        style={styles.textInput}
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.text}>Last Name</Text>
      <TextInput
        style={styles.textInput}
        value={lastName}
        onChangeText={setLastName}
      />
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.textInput}
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Button
        style={styles.button}
        onPress={handleNext}
        disabled={!isFormValid()}
      >
        Next
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
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
    padding: 8,
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
    borderWidth: 3,
    borderColor: "#495E57",
    fontSize: 20,
    color: "#495e57",
  },
  warning: {
    color: "red",
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
