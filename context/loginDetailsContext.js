import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginDetailsContext = createContext();

const LoginDetailsProvider = ({ children }) => {
  const [state, setState] = useState({
    initials: "",
    avatar: null,
  });
  //accessing local data
  useEffect(() => {
    const fetchUserInitials = async () => {
      try {
        const UserInfo = await AsyncStorage.getItem("userInfo");
        if (UserInfo) {
          const parsedUserInfo = JSON.parse(UserInfo);
          const userInitials = (
            parsedUserInfo.firstName[0] + parsedUserInfo.lastName[0]
          ).toUpperCase();
          const avtrSource = parsedUserInfo.avatarSource;
          console.log("UserInitials in context:", userInitials);
          console.log("avtrSource in contxt: ", avtrSource);
          setState({
            ...state,
            initials: userInitials,
            avatar: avtrSource,
          });
        }
      } catch (error) {
        console.error("Error fetching user data in Context Provider:", error);
      }
    };

    fetchUserInitials();
  }, []);

  // useEffect(() => {
  //   const { initials, avatar } = state;
  //   console.log("In context provider", initials, avatar);
  // }, [state]);

  return (
    <LoginDetailsContext.Provider value={[state, setState]}>
      {children}
    </LoginDetailsContext.Provider>
  );
};

export { LoginDetailsContext, LoginDetailsProvider };
