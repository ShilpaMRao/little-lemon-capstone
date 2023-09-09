import { useState, useEffect } from "react";
import { Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "./Splash";
import Home from "./Home";
import MenuItemDetail from "./MenuItemDetail";
import OrderPage from "./OrderPage";
import Profile from "./Profile";
import PaymentPage from "./PaymentPage";
import Onboarding from "./Onboarding";
import { useContext } from "react";
import { LoginDetailsContext } from "../context/loginDetailsContext";

function LogoTitle() {
  return (
    <Image
      source={require("../assets/Logo.png")}
      style={{
        height: 60,
        width: 250,
        resizeMode: "contain",
        alignSelf: "center",
      }}
    />
  );
}

const ScreenMenus = () => {
  const Stack = createNativeStackNavigator();
  const [state] = useContext(LoginDetailsContext);
  const token = state.token;
  console.log("Token in ScreenMenus: ", token);
  return (
    <Stack.Navigator initialRouteName="Home">
      {token ? (
        <>
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              title: "Profile",

              headerTitle: (props) => <LogoTitle {...props} />,
            }}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",

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
          <Stack.Screen
            name="PaymentPage"
            component={PaymentPage}
            options={{
              title: "PaymentPage",

              headerTitle: (props) => <LogoTitle {...props} />,
            }}
          />
        </>
      ) : (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      )}
    </Stack.Navigator>
  );
};

export default ScreenMenus;
