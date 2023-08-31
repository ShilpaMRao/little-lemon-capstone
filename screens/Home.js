import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import debounce from "lodash.debounce";
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from "../database";
import Filters from "../components/Filters";
import { getSectionListData, useUpdateEffect } from "../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import RenderInitials from "../utils/RenderInitials";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
const sections = ["Appetizers", "Salads", "Beverages"];
const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const BASE_IMAGE_URL =
  "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/";

// const fetchData = async () => {
//   const response = await fetch(API_URL);
//   const json = await response.json();

//   const menuItems = json.menu.map((item) => ({
//     ...item,
//     category: item.category.title,
//   }));
//   console.log(menuItems);
//   return menuItems;
// };

// useEffect(() => {
//   (async () => {
//     try {
//       await createTable();
//       let menuItems = await getMenuItems();
//       // The application only fetches the menu data once from a remote URL
//       // and then stores it into a SQLite database.
//       // After that, every application restart loads the menu from the database
//       if (!menuItems.length) {
//         const menuItems = await fetchData();
//         saveMenuItems(menuItems);
//       }
//       const sectionListData = getSectionListData(menuItems);
//       setData(sectionListData);
//     } catch (e) {
//       // Handle error
//       Alert.alert(e.message);
//     }
//   })();
// }, []);

// useUpdateEffect(() => {
//   (async () => {
//     const activeCategories = sections.filter((s, i) => {
//       // If all filters are deselected, all categories are active
//       if (filterSelections.every((item) => item === false)) {
//         return true;
//       }
//       return filterSelections[i];
//     });
//     try {
//       const menuItems = await filterByQueryAndCategories(
//         query,
//         activeCategories
//       );
//       const sectionListData = getSectionListData(menuItems);
//       setData(sectionListData);
//     } catch (e) {
//       Alert.alert(e.message);
//     }
//   })();
// }, [filterSelections, query]);

// const lookup = useCallback((q) => {
//   setQuery(q);
// }, []);

// const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

// const handleSearchChange = (text) => {
//   setSearchBarText(text);
//   debouncedLookup(text);
// };

// const handleFiltersChange = async (index) => {
//   const arrayCopy = [...filterSelections];
//   arrayCopy[index] = !filterSelections[index];
//   setFilterSelections(arrayCopy);
// };

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);

  const [searchBarText, setSearchBarText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
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
  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      // If category is already selected, remove it
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((cat) => cat !== category)
      );
    } else {
      // If category is not selected, add it
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
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
  const getImageUrl = (imageFileName) => {
    return `${BASE_IMAGE_URL}${imageFileName}?raw=true`;
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const uniqueCategories = Array.from(
    new Set(data.map((item) => capitalizeFirstLetter(item.category)))
  );

  const filterItemsByCategory = () => {
    const lowercaseSelectedCategories = selectedCategories.map((category) =>
      category.toLowerCase()
    );

    if (lowercaseSelectedCategories.length === 0 && !searchBarText) {
      return data; // If no category is selected and no search query, return all data
    }

    return data.filter((item) => {
      const lowercaseCategory = (item.category || "").toLowerCase();
      const lowercaseTitle = (item.name || "").toLowerCase(); // Use 'name' instead of 'title'

      const includesCategory =
        lowercaseSelectedCategories.includes(lowercaseCategory);

      const includesSearchQuery = lowercaseTitle.includes(
        searchBarText.toLowerCase()
      );

      return (
        (lowercaseSelectedCategories.length === 0 || includesCategory) &&
        (searchBarText === "" || includesSearchQuery)
      );
    });
  };

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
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Hero />
        <Searchbar
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#495E57"
          onChangeText={(query) => setSearchBarText(query)}
          value={searchBarText}
          iconColor="#495E57"
          elevation={0}
        />
      </ScrollView>

      <View style={styles.categoryContainer}>
        <Text style={styles.orderTab}>ORDER FOR DELIVERY!</Text>
        <View style={styles.tab}>
          {uniqueCategories.map((category) => (
            <Pressable
              key={category}
              onPress={() => handleCategorySelect(category)}
            >
              <Text
                style={[
                  styles.tabItem,
                  selectedCategories.includes(category) &&
                    styles.selectedCategory, // Apply styles for selected categories
                ]}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      {/* </ScrollView> */}
      <View style={styles.listView}>
        <FlatList
          data={filterItemsByCategory()} // Pass the filtered items to the FlatList
          keyExtractor={(item) => item.name} // Assuming 'name' is a unique identifier
          renderItem={renderItem}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#495E57",
  },

  searchBar: {
    marginLeft: 15,
    borderRadius: 8,
    height: 50,
    width: 380,
    color: "#495E57",
    marginBottom: 10,
  },
  categoryContainer: {
    backgroundColor: "white",
  },
  orderTab: {
    fontSize: 25,
    padding: 15,
    fontWeight: "bold",
    backgroundColor: "white",
  },
  tab: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  tabItem: {
    backgroundColor: "#EDEFEE",
    padding: 15,
    marginLeft: 10,
    fontSize: 15,
    borderRadius: 8,
    color: "#495E57",
    fontWeight: "bold",
  },
  selectedCategory: {
    backgroundColor: "#495E57",
    padding: 15,
    marginLeft: 10,
    fontSize: 15,
    borderRadius: 8,
    color: "#EDEFEE",
    fontWeight: "bold",
  },
  listView: {
    flex: 0.8,
    backgroundColor: "white",
  },

  menuItemContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#495E57",
  },
  menuItemTextContainer: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 10,
  },
  menuItemImage: {
    width: 100,
    height: 100,
    marginRight: 10, // Add margin to separate the image from text
  },
  menuItemTextContainer: {
    flex: 1, // Allow text to expand and take available space
  },
  menuItemTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  menuItemDescription: {
    fontSize: 18,
    color: "#495E57",
    flexWrap: "wrap",
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: "#495E57",
  },
});

export default Home;
