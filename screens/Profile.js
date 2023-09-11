import React from "react";
import { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import CheckBox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import { validatePhone } from "../utils";
import Footer from "../components/Footer";
import { useContext } from "react";
import { LoginDetailsContext } from "../context/loginDetailsContext";
import useHeaderWithInitials from "../components/customHooks/useHeaderWithInitials";

const Profile = ({ navigation }) => {
  //global state to set the initials and the avatar
  const [state, setState] = useContext(LoginDetailsContext);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [eml, setEml] = useState("");
  const [toggleCheckBoxPasswordChanges, setToggleCheckBoxPasswordChanges] =
    useState(false);
  const [toggleCheckBoxSpecialOffers, setToggleCheckBoxSpecialOffers] =
    useState(false);
  const [toggleCheckBoxOrderStatuses, setToggleCheckBoxOrderStatuses] =
    useState(false);
  const [toggleCheckBoxNewsletters, setToggleCheckBoxNewsletters] =
    useState(false);
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  //const [initials, setInitials] = useState("");
  const [avatar, setAvatar] = useState(null);
  const isPhonenumberValid = validatePhone(phone);

  console.log("UserInfo from context into Profile :", state);
  const parsedUserInfo = state.user;
  console.log("ParsedUserInfo from context :", parsedUserInfo);
  const initials = state.initials;
  console.log("initials from context:", initials);
  console.log("avatar from context:", state.avatar);

  //getting the user info from the AsyncStorage
  useEffect(() => {
    setFName(parsedUserInfo.firstName);
    setLName(parsedUserInfo.lastName);
    setEml(parsedUserInfo.email);
    if (parsedUserInfo.phone) setPhone(parsedUserInfo.phone);
    setToggleCheckBoxNewsletters(parsedUserInfo.newsletter);
    setToggleCheckBoxOrderStatuses(parsedUserInfo.orderStatuses);
    setToggleCheckBoxPasswordChanges(parsedUserInfo.passwordChanges);
    setToggleCheckBoxSpecialOffers(parsedUserInfo.specialOffers);
    const avtrSource = state.avatar;
    setAvatar(avtrSource);
  }, []);

  // Use customHook to configure the header
  useHeaderWithInitials(navigation, initials, avatar);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("---->", result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log("Image after image picking : ", result.assets[0].uri);

      setState({ ...state, avatar: image });
    }
  };

  const renderAvatar = () => {
    if (avatar) {
      return (
        <Image
          source={{ uri: avatar }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      );
    } else {
      return (
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: "#495E57",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!isLoggedOut ? (
            <Text style={{ fontSize: 24, color: "white" }}>{initials}</Text>
          ) : (
            <Text style={{ fontSize: 24, color: "white" }}></Text>
          )}
        </View>
      );
    }
  };

  const handleLogout = async () => {
    setState({
      initials: "",
      user: "null",
      avatar: "",
      token: false,
    });
    try {
      // Clear all stored data in AsyncStorage
      await AsyncStorage.removeItem("userInfo");
      setIsLoggedOut(true);
      setToggleCheckBoxPasswordChanges(false);
      setToggleCheckBoxOrderStatuses(false);
      setToggleCheckBoxNewsletters(false);
      setToggleCheckBoxSpecialOffers(false);
      setPhone("");
      //Alert.alert("Logging out!");
      setFName("");
      setLName("");
      setEml("");
      setImage(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
    // Navigate to OnboardingScreen and clear the global state

    console.log("After Log out , state: ", state);
    navigation.navigate("Onboarding");
  };
  const handleDiscardChanges = () => {
    Alert.alert("Changes Discarded");
  };
  const handleSaveChanges = async () => {
    try {
      // Convert boolean to string before saving
      await AsyncStorage.setItem(
        "userInfo",
        JSON.stringify({
          firstName: fName,
          lastName: lName,
          email: eml,
          phone: phone,
          avatarSource: image,
          orderStatuses: toggleCheckBoxOrderStatuses,
          passwordChanges: toggleCheckBoxPasswordChanges,
          specialOffers: toggleCheckBoxSpecialOffers,
          newsletter: toggleCheckBoxNewsletters,
          isOnboardingComplete: true,
        })
      );
      // save the initials and avatar into global state
      const data = await AsyncStorage.getItem("userInfo");
      const loginData = JSON.parse(data);
      setState({
        ...state,
        user: loginData,
        initials: initials,
        avatar: avatar,
      });
    } catch (error) {
      console.error("Error saving user info:", error);
    }
    navigation.navigate("Home");
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Personal Information</Text>
      <View style={styles.imgcontainer}>
        {renderAvatar()}
        <Button style={styles.changeButton} onPress={pickImage}>
          Change
        </Button>
        <Button
          style={styles.removeButton}
          onPress={pickImage}
          textColor="#495E57"
        >
          Remove
        </Button>
      </View>
      <Text style={styles.text}>First Name</Text>
      <Text style={styles.textInput}>{fName}</Text>

      <Text style={styles.text}>Last Name</Text>
      <Text style={styles.textInput}>{lName}</Text>

      <Text style={styles.text}>Email</Text>
      <Text style={styles.textInput}>{eml}</Text>
      <Text style={styles.text}>Phone number</Text>
      <TextInput
        style={styles.textInput}
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
      />

      <Text style={styles.text}>Email notifications</Text>
      <View style={styles.imgcontainer}>
        <CheckBox
          style={{ marginTop: 10 }}
          disabled={false}
          value={toggleCheckBoxPasswordChanges}
          onValueChange={(newValue) =>
            setToggleCheckBoxPasswordChanges(newValue)
          }
        />
        <Text style={styles.text}>Password Changes</Text>
      </View>
      <View style={styles.imgcontainer}>
        <CheckBox
          style={{ marginTop: 10 }}
          disabled={false}
          value={toggleCheckBoxSpecialOffers}
          onValueChange={(newValue) => setToggleCheckBoxSpecialOffers(newValue)}
        />
        <Text style={styles.text}>Special Offers</Text>
      </View>
      <View style={styles.imgcontainer}>
        <CheckBox
          style={{ marginTop: 10, color: "#495E57" }}
          disabled={false}
          value={toggleCheckBoxOrderStatuses}
          onValueChange={(newValue) => setToggleCheckBoxOrderStatuses(newValue)}
        />
        <Text style={styles.text}>Order Statuses</Text>
      </View>
      <View style={styles.imgcontainer}>
        <CheckBox
          style={{ marginTop: 10 }}
          disabled={false}
          value={toggleCheckBoxNewsletters}
          onValueChange={(newValue) => setToggleCheckBoxNewsletters(newValue)}
        />
        <Text style={styles.text}>Newsletters</Text>
      </View>
      <Button
        style={styles.logoutButton}
        onPress={handleLogout}
        textColor="#495E57"
      >
        Logout
      </Button>
      <View style={styles.imgcontainer}>
        <Button
          style={styles.discardChangesButton}
          textColor="#495E57"
          onPress={handleDiscardChanges}
        >
          Discard Changes
        </Button>
        <Button
          style={styles.saveChangesButton}
          textColor="#EEFEEE"
          disabled={!isPhonenumberValid}
          onPress={handleSaveChanges}
        >
          Save Changes
        </Button>
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 24,
  },
  imgcontainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    height: 100,
    width: 100,
    marginTop: 10,
    marginLeft: 20,
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
    borderWidth: 1,
    borderColor: "#495E57",
    fontSize: 20,
    color: "#495e57",
  },
  warning: {
    color: "red",
  },
  changeButton: {
    height: 50,
    width: 100,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#495E57",
    color: "#EEFEEF",
    fontSize: 25,
    textAlign: "center",
    marginLeft: 20,
    marginVertical: 40,
  },
  removeButton: {
    height: 50,
    width: 100,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "white",
    borderColor: "#495e57",
    borderWidth: 2,
    color: "#495E57",
    fontSize: 25,
    textAlign: "center",
    marginLeft: 20,
    marginVertical: 40,
  },
  logoutButton: {
    height: 50,
    width: 350,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#F4CE14",
    color: "#495E57",
    fontSize: 25,
    textAlign: "center",

    marginVertical: 40,
    marginTop: 20,
  },
  discardChangesButton: {
    height: 50,
    width: 175,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "white",
    borderColor: "#495e57",
    borderWidth: 1,
    color: "#495E57",
    fontSize: 25,
    textAlign: "center",
    marginVertical: 40,
    marginTop: 0,
  },
  saveChangesButton: {
    height: 50,
    width: 175,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#495e57",
    borderColor: "#495e57",
    borderWidth: 2,
    fontSize: 25,
    textAlign: "center",
    marginLeft: 10,
    marginVertical: 40,
    marginTop: 0,
  },
});

export default Profile;
