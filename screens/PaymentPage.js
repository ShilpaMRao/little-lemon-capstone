import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";

import Hero from "../components/Hero";
import { ScrollView } from "react-native";
import Footer from "../components/Footer";
import { useContext } from "react";
import { LoginDetailsContext } from "../context/loginDetailsContext";
import useHeaderWithInitials from "../components/customHooks/useHeaderWithInitials";

const PaymentPage = ({ navigation }) => {
  //global state
  const [state] = useContext(LoginDetailsContext);
  // Now you can access state.initials and state.avatar
  const { initials, avatar } = state;
  // Use custom hook to configure the header
  useHeaderWithInitials(navigation, initials, avatar);
  return (
    <ScrollView style={styles.container}>
      <Hero />
      <View style={styles.content}>
        <Text style={styles.textContainer}>
          Thank you for your payment. Your order will be delivered to you
          shortly!
        </Text>
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make the container flex to occupy the entire screen
  },
  content: {
    flex: 1, // Make the content flex to occupy the remaining space
  },
  textContainer: {
    fontSize: 40,
    padding: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#495E57",
    marginTop: 120,
    marginBottom: 64,
  },
});

export default PaymentPage;
