import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import Home from "./screens/Home";
import SplashScreen from "./screens/Splash";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();
function LogoTitle() {
  return (
    <Image
      source={require("C:/Users/Admin/Shilpa/Coursera/little-lemon-capstone/assets/Logo.png")}
      style={{
        height: 60,
        width: 250,
        resizeMode: "contain",
        alignSelf: "center",
      }}
    />
  );
}
export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  // useEffect(() => {
  //   // Read the onboarding completion flag from AsyncStorage
  //   const fetchData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem("isOnboardingComplete");
  //       if (value === "true") setIsOnboardingComplete(true);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error reading onboarding status:", error);
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData(); // Call the async function
  // }, []); // Display Splash Screen until AsyncStorage is read
  // if (isLoading) {
  //   return <SplashScreen />;
  // }
  // console.log("isOnboardingComplete in App.js:", isOnboardingComplete);
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        {/* <Stack.Screen name="Onboarding" component={Onboarding} /> */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerTitle: (props) => <LogoTitle {...props} />,
          }}
        />
        {/* <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "Profile",
            headerTitle: (props) => <LogoTitle {...props} />,
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
