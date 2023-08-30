import React, { useState } from "react";
import { validateEmail, validateName } from "../utils";
import Button from "../components/Button";
import { useFonts } from "expo-font";
import { Image, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Hero from "../components/Hero";

const Onboarding = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const isEmailValid = validateEmail(email);
  const isFirstNameValid = validateName(firstName);
  const isLastNameValid = validateName(lastName);
  const isFormValid = () => isEmailValid && isFirstNameValid && isLastNameValid;

  const handleNext = async () => {
    // When onboarding is completed
    console.log("In Handle Next");
    try {
      //setting user details in AsyncStorage
      await AsyncStorage.setItem(
        "userInfo",
        JSON.stringify({
          firstName,
          lastName,
          email,
          phone: null,
          avatarSource: null,
          orderStatuses: false,
          passwordChanges: false,
          specialOffers: false,
          newsletter: false,
          isOnboardingComplete: true,
        })
      );
      console.log("User details stored successfully in AsyncStorage");
      navigation.navigate("Profile");
      console.log("Navigated to 'Profile'");
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (error) {
      console.error("Error setting onboarding status in Onboarding.js:", error);
    }
  };
  // const [loaded] = useFonts({
  //   Markazi: require("C:/Users/Admin/Shilpa/Coursera/little-lemon-capstone/assets/fonts/MarkaziText-Regular.ttf"),
  // });

  // if (!loaded) {
  //   return null;
  // }
  return (
    <ScrollView style={styles.container}>
      {/* <Image
        style={styles.img}
        source={require("../assets/Logo.png")}
        resizeMode="contain"
        accessible={true}
        accessibilityLabel="Little Lemon Logo"
      />
      <Text style={styles.introText}>Let us get to know you</Text> */}
      <Hero />

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
  },
  img: {
    height: 150,
    width: 350,
  },
  introText: {
    padding: 10,
    // fontFamily: "MarkaziText-Regular,Arial,sans-serif",
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
    marginLeft: 24,
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
    marginLeft: 24,
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
    marginLeft: 170,
    marginVertical: 40,
  },
});
export default Onboarding;
