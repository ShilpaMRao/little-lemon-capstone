import { useState, useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import Onboarding from "./screens/Onboarding";
import Profile from "./screens/Profile";
import Home from "./screens/Home";
import SplashScreen from "./screens/Splash";
import MenuItemDetail from "./screens/MenuItemDetail";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderPage from "./screens/OrderPage";
const Stack = createNativeStackNavigator();
function LogoTitle() {
  return (
    <Image
      source={require("./assets/Logo.png")}
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

  useEffect(() => {
    // Read the onboarding completion flag from AsyncStorage
    const fetchData = async () => {
      try {
        const userInfo = await AsyncStorage.getItem("userInfo");
        console.log("UserInfo in App.js: ", userInfo);
        if (userInfo) {
          const parsedUserInfo = JSON.parse(userInfo);
          const onboardingStatus = parsedUserInfo.isOnboardingComplete;
          console.log("onboardingStatus in App.js:", onboardingStatus);
          setIsOnboardingComplete(onboardingStatus);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error reading onboarding status:", error);
        setIsLoading(false);
      }
    };
    fetchData(); // Call the async function
  }, []); // Display Splash Screen until AsyncStorage is read
  if (isLoading) {
    return <SplashScreen />;
  }
  console.log("isOnboardingComplete in App.js:", isOnboardingComplete);
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
      // initialRouteName={isOnboardingComplete ? "Home" : "Onboarding"}
      >
        {isOnboardingComplete ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: "Home",
                headerTitle: (props) => <LogoTitle {...props} />,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                title: "Profile",
                headerLeft: null, // This hides the back button for YourScreen
                headerTitle: (props) => <LogoTitle {...props} />,
              }}
            />
            <Stack.Screen
              name="MenuItemDetail"
              component={MenuItemDetail}
              options={{
                title: "Menu",
                headerTitle: (props) => <LogoTitle {...props} />,
              }}
            />
            <Stack.Screen
              name="OrderPage"
              component={OrderPage}
              options={{
                title: "Orders",

                headerTitle: (props) => <LogoTitle {...props} />,
              }}
            />
          </>
        ) : (
          <Stack.Screen name="Onboarding" component={Onboarding} />
        )}
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
