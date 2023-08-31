import React, { useEffect, useLayoutEffect } from "react";
import { View, Image, Text, Dimensions, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Button from "../components/Button";
import { useState } from "react";
import RenderInitials from "../utils/RenderInitials";
import AsyncStorage from "@react-native-async-storage/async-storage";
const BASE_IMAGE_URL =
  "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/";

const MenuItemDetail = ({ navigation }) => {
  const route = useRoute();
  const [count, setCount] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const { menuItem } = route.params; // Get menu item data from route params
  //--------------Logic to render Avatar on the top right of the header -------//
  const [initials, setInitials] = useState("");
  const [avatar, setAvatar] = useState(null);
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
          const avtrSource = parsedUserInfo.avatarSource;
          setAvatar(avtrSource);
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
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable
            onPress={() => {
              // Handle the press event here, e.g., navigate to another screen
              navigation.navigate("Profile");
            }}
          >
            {/* Add your Pressable content here */}
            <RenderInitials initials={initials} imageUrl={avatar} />
          </Pressable>
        </View>
      ),
    });
  }, [navigation, initials, avatar]);
  //----------------------------------------------------------//
  const getImageUrl = (imageFileName) => {
    return `${BASE_IMAGE_URL}${imageFileName}?raw=true`;
  };

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const handleDecrement = () => {
    if (count > 0) setCount((prevCount) => prevCount - 1);
  };
  const handleOrderPage = () => {
    let selectedItem = null;
    let updatedSelectedItems = null;
    if (count > 0) {
      selectedItem = {
        name: menuItem.name,
        quantity: count,
        price: menuItem.price * count,
      };
      setSelectedItems([...selectedItems, selectedItem]);
      updatedSelectedItems = [...selectedItems, selectedItem];
    }
    setCount(1);
    console.log("selected items :", updatedSelectedItems);
    if (count > 0) {
      navigation.navigate("OrderPage", {
        menuItem: updatedSelectedItems,
      });
    } else {
      navigation.navigate("OrderPage", { menuItem: selectedItems });
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: getImageUrl(menuItem.image) }}
        style={styles.heroImage}
        resizeMode="stretch"
      />
      <Text style={styles.textHeading}>{menuItem.name}</Text>
      <Text style={styles.description}>{menuItem.description}</Text>
      <View style={styles.incrementdecrementContainer}>
        <Pressable onPress={handleDecrement}>
          <Text style={styles.decrement}>-</Text>
        </Pressable>
        <Text style={styles.count}>{count}</Text>
        <Pressable onPress={handleIncrement}>
          <Text style={styles.increment}>+</Text>
        </Pressable>
      </View>
      <Button
        style={styles.button}
        textColor={"#495E57"}
        textFont={"bold"}
        onPress={handleOrderPage}
      >
        Add for ${menuItem.price * count}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroImage: {
    height: 300,
    width: Dimensions.get("window").width,
  },
  textHeading: {
    fontSize: 25,
    color: "#495E57",
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 5,
  },
  description: {
    fontSize: 20,
    color: "#495E57",
    marginLeft: 20,
  },
  price: {
    fontSize: 20,
    color: "#495E57",
    marginLeft: 20,
    fontWeight: "bold",
  },
  button: {
    height: 50,
    width: 350,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#F4CE14",
    color: "#495E57",
    fontSize: 25,
    textAlign: "center",
    alignSelf: "center",
    marginLeft: 10,
  },
  incrementdecrementContainer: {
    flexDirection: "row",
    marginLeft: 130,
    marginTop: 150,
  },
  decrement: {
    fontSize: 35,
    padding: 20,
    fontWeight: "bold",
  },
  count: {
    fontSize: 35,
    padding: 20,
    fontWeight: "bold",
  },
  increment: {
    fontSize: 35,
    padding: 20,
    fontWeight: "bold",
  },
});
export default MenuItemDetail;
