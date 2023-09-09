import { View, Text } from "react-native";
import React from "react";
import { LoginDetailsProvider } from "./context/loginDetailsContext";
import ScreenMenus from "./screens/ScreenMenus";

const RootNavigation = () => {
  return (
    <LoginDetailsProvider>
      <ScreenMenus />
    </LoginDetailsProvider>
  );
};

export default RootNavigation;
