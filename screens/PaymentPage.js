import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import RenderInitials from "../utils/RenderInitials";
import Hero from "../components/Hero";
import { ScrollView } from "react-native";
// import GreenCircleBackButton from "../utils/GreenCircleBackButton";

const PaymentPage = ({ navigation }) => {
  //--------------Logic to render Avatar on the top right of the header -------//
  const [initials, setInitials] = useState("");
  useEffect(() => {
    const fetchUserInitials = async () => {
      try {
        const UserInfo = await AsyncStorage.getItem("userInfo");
        if (UserInfo) {
          const parsedUserInfo = JSON.parse(UserInfo);
          const userInitials = (
            parsedUserInfo.firstName[0] + parsedUserInfo.lastName[0]
          ).toUpperCase();
          setInitials(userInitials);
        }
      } catch (error) {
        console.error("Error fetching user initials:", error);
      }
    };

    fetchUserInitials();
  }, []);

  // Use useLayoutEffect to configure the header
  useLayoutEffect(() => {
    navigation.setOptions({
      // headerLeft: (props) => <GreenCircleBackButton {...props} />,

      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable
            onPress={() => {
              // Handle the press event here, e.g., navigate to another screen
              navigation.navigate("Profile");
            }}
          >
            {/* Add your Pressable content here */}
            <RenderInitials initials={initials} />
          </Pressable>
        </View>
      ),
    });
  }, [navigation, initials]);
  //----------------------------------------------------------//
  return (
    <ScrollView style={styles.container}>
      <Hero />
      <View style={styles.content}>
        <Text style={styles.textContainer}>Payment</Text>
        {/* Other content goes here */}
      </View>
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
  },
});

export default PaymentPage;
