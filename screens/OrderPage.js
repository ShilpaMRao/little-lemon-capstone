import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { RadioButton } from "react-native-radio-buttons-group";
import Button from "../components/Button";
import RenderInitials from "../utils/RenderInitials";
import { useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable } from "react-native";
import { useContext } from "react";
import { LoginDetailsContext } from "../context/loginDetailsContext";
import useHeaderWithInitials from "../components/customHooks/useHeaderWithInitials";
const BASE_IMAGE_URL =
  "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/";
const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const cost = [
  { name: "SubTotal", price: 0 },
  { name: "Delivery", price: 2 },
  { name: "Service", price: 1 },
  { name: "Total", price: 0 },
];
const OrderPage = ({ navigation }) => {
  const [data, setData] = useState("");
  const route = useRoute();
  // accessing global state
  const [state] = useContext(LoginDetailsContext);
  const { initials, avatar } = state;
  // Use customHook to configure the header
  useHeaderWithInitials(navigation, initials, avatar);
  //----------------------------------------------------------//
  const { menuItem } = route.params; // Get menu item data from route params
  console.log("MenuItems in orderpage.js : ", menuItem);
  // Create a map to store consolidated items
  const consolidatedItemsMap = new Map();

  // Iterate through the original array
  menuItem.forEach((item) => {
    const itemName = item.name;
    const itemPrice = item.price;
    const itemQuantity = item.quantity;

    // If the item name is already in the map, update the quantity
    if (consolidatedItemsMap.has(itemName)) {
      const existingItem = consolidatedItemsMap.get(itemName);
      existingItem.quantity += itemQuantity;
    } else {
      // If it's not in the map, add it with the current values
      consolidatedItemsMap.set(itemName, {
        name: itemName,
        price: itemPrice,
        quantity: itemQuantity,
      });
    }
  });
  // Convert the consolidated items map back to an array
  const consolidatedItems = Array.from(consolidatedItemsMap.values());

  // Now, consolidatedItems contains the items with quantities updated
  console.log(consolidatedItems);

  const getImageUrl = (imageFileName) => {
    return `${BASE_IMAGE_URL}${imageFileName}?raw=true`;
  };

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const jsonData = await response.json();
      setData(jsonData.menu); // Store the fetched data in the state variable
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);
  // Render each menu item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        // Navigate to MenuItemDetailScreen and pass menu item data as params
        navigation.navigate("MenuItemDetail", { menuItem: item });
      }}
    >
      <View style={styles.menuItemContainer}>
        <View style={styles.menuItemTextContainer}>
          <Text style={styles.menuItemTitle}>{item.name}</Text>
          <Text style={styles.menuItemDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
        </View>
        <Image
          source={{ uri: getImageUrl(item.image) }} // Use the getImageUrl function
          style={styles.menuItemImage}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
  const renderOrderDetails = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderPlacedText}>
        {item.name} x {item.quantity}
      </Text>
      <Text style={styles.orderPlacedPrice}>${item.price.toFixed(2)}</Text>
    </View>
  );
  // Calculate the total cost including selected items and additional costs
  const subTotal = menuItem.reduce((acc, item) => acc + item.price, 0);
  const totalCost = subTotal + cost[1].price + cost[2].price;

  // Update the "Total" and "SubTotal" costs in the array
  cost[0].price = subTotal;
  cost[3].price = totalCost;
  // Create a new data array that includes selected items and cost data
  //   const combinedData = [...menuItem, ...cost];
  //   console.log(combinedData);
  const renderTotal = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderPlacedText}>{item.name}</Text>
      <Text style={styles.orderPlacedPrice}>${item.price.toFixed(2)}</Text>
    </View>
  );
  const handleCheckout = () => {
    navigation.navigate("PaymentPage");
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.cutlery}>Cutlery</Text>
        <Text style={styles.cutleryText}>
          Help reduce plastic waste. Only ask for cutlery if you need it.
        </Text>
        <Text style={styles.orderSummary}>Order Summary</Text>
        <View style={styles.itemsHeader}>
          <Text style={styles.itemText}>Items</Text>
        </View>
        <View style={styles.orderContainer}>
          <FlatList
            data={consolidatedItems}
            renderItem={renderOrderDetails}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <Text style={styles.addmoreText}>Add more to your order!</Text>
      <View style={styles.container}>
        <FlatList
          data={data}
          horizontal={true} // Set horizontal to true for a horizontal list
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.container}>
        {/* if there are no orders , don't print the bill */}
        {consolidatedItems.length > 0 && (
          <FlatList
            data={cost}
            renderItem={renderTotal}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
      <Button
        style={styles.button}
        textColor={"#495E57"}
        textFont={"bold"}
        onPress={handleCheckout}
      >
        CheckOut
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cutlery: {
    fontSize: 25,
    color: "#495E57",
    padding: 10,
    fontWeight: "bold",
  },
  cutleryText: {
    fontSize: 18,
    color: "#495E57",
    marginLeft: 10,
    width: 325,
    // fontWeight: "bold",
  },
  orderSummary: {
    fontSize: 25,
    color: "#495E57",
    padding: 10,
    fontWeight: "bold",
  },
  itemsHeader: {
    backgroundColor: "lightgray",
    width: Dimensions.get("window").width,
    height: 50,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 15,
    color: "#495E57",
  },
  orderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    // borderBottomWidth: 1,
    // borderBottomColor: "#495E57",
  },

  orderPlacedText: {
    flex: 2,
    marginLeft: 15,
    fontSize: 18,
    color: "#495E57",
    fontWeight: "bold",
  },
  orderPlacedPrice: {
    flex: 1,
    alignItems: "flex-end",
    fontSize: 18,
    color: "#495E57",
    fontWeight: "bold",
    marginLeft: 160,
  },
  addmoreText: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 15,
    color: "#495E57",
    marginTop: 40,
  },
  menuItem: {
    width: 100, // Set the width of each menu item as needed
    height: 50, // Set the height of each menu item as needed
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    marginLeft: 8,
  },
  menuItemTextContainer: {
    flexDirection: "column",
    flex: 1,
  },
  menuItemImage: {
    width: 100,
    height: 100,
    marginRight: 5, // Add margin to separate the image from text
  },
  menuItemTextContainer: {
    flex: 1, // Allow text to expand and take available space
  },
  menuItemTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#495E57",
  },
  menuItemDescription: {
    fontSize: 18,
    color: "#495E57",
    flexWrap: "wrap",
    width: 250,
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: "#495E57",
  },
  totalOrderContainer: {
    flexDirection: "column",
    // justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    // borderBottomWidth: 1,
    // borderBottomColor: "#495E57",
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
    marginBottom: 30,
    marginTop: 20,
  },
});

export default OrderPage;
