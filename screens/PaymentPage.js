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
import Footer from "../components/Footer";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useContext } from "react";
import { LoginDetailsContext } from "../context/loginDetailsContext";
import useHeaderWithInitials from "../components/customHooks/useHeaderWithInitials";

// import GreenCircleBackButton from "../utils/GreenCircleBackButton";

const PaymentPage = ({ navigation }) => {
  const [state] = useContext(LoginDetailsContext);
  // Now you can access state.initials and state.avatar
  const { initials, avatar } = state;
  //--------------Logic to render Avatar on the top right of the header -------//
  // const [initials, setInitials] = useState("");
  // const [avatar, setAvatar] = useState(null);
  // useEffect(() => {
  //   const fetchUserInitials = async () => {
  //     try {
  //       const UserInfo = await AsyncStorage.getItem("userInfo");
  //       if (UserInfo) {
  //         const parsedUserInfo = JSON.parse(UserInfo);
  //         const userInitials = (
  //           parsedUserInfo.firstName[0] + parsedUserInfo.lastName[0]
  //         ).toUpperCase();
  //         setInitials(userInitials);
  //         const avtrSource = parsedUserInfo.avatarSource;
  //         setAvatar(avtrSource);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user initials:", error);
  //     }
  //   };

  //   fetchUserInitials();
  // }, []);

  // Use useLayoutEffect to configure the header
  useHeaderWithInitials(navigation, initials, avatar);
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     // headerLeft: (props) => <GreenCircleBackButton {...props} />,

  //     headerRight: () => (
  //       <View style={{ flexDirection: "row", alignItems: "center" }}>
  //         <Pressable
  //           onPress={() => {
  //             // Handle the press event here, e.g., navigate to another screen
  //             navigation.navigate("Profile");
  //           }}
  //         >
  //           {/* Add your Pressable content here */}
  //           <RenderInitials initials={initials} imageUrl={avatar} />
  //         </Pressable>
  //       </View>
  //     ),
  //   });
  // }, [navigation, initials, avatar]);
  // //----------------------------------------------------------//
  // disabling the backbutton on the header of the page
  // useEffect(
  //   () =>
  //     navigation.addListener("beforeRemove", (e) => {
  //       e.preventDefault();
  //       return;
  //     }),
  //   [navigation]
  // );
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );
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
