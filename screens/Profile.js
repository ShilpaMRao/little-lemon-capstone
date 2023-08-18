import React from "react";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  View,
} from "react-native";
import Button from "../components/Button";
// import { CheckBoxComponent } from "@react-native-community/checkbox";
import * as ImagePicker from "expo-image-picker";
const defaultAvatar = require("C:/Users/Admin/Shilpa/Coursera/little-lemon-capstone/assets/Profile.png");

const Profile = ({ route }) => {
  console.log("In Profile", route);
  const { firstName, lastName, email } = route.params;
  const [isChecked, setIsChecked] = useState(false);
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // const handleCheckboxChange = () => {
  //   setIsChecked(!isChecked);
  // };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Personal Information</Text>
      <View style={styles.imgcontainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.img} />
        ) : (
          <Image source={defaultAvatar} style={styles.img} />
        )}
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
      <Text style={styles.textInput}>{firstName}</Text>

      <Text style={styles.text}>Last Name</Text>
      <Text style={styles.textInput}>{lastName}</Text>

      <Text style={styles.text}>Email</Text>
      <Text style={styles.textInput}>{email}</Text>
      <Text style={styles.text}>Phone number</Text>
      <TextInput
        style={styles.textInput}
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
      />
      <Text style={styles.text}>Email notifications</Text>
      {/* <CheckBoxComponent
        value={isChecked}
        onValueChange={handleCheckboxChange}
      />
      <CheckBoxComponent
        value={isChecked}
        onValueChange={handleCheckboxChange}
      />
      <CheckBoxComponent
        value={isChecked}
        onValueChange={handleCheckboxChange}
      />
      <CheckBoxComponent
        value={isChecked}
        onValueChange={handleCheckboxChange}
      /> */}
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
    borderWidth: 3,
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
});

export default Profile;
