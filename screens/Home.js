import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
} from "react-native";
import { Searchbar } from "react-native-paper";
import debounce from "lodash.debounce";
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from "../database";
import Filters from "../components/Filters";
import { getSectionListData, useUpdateEffect } from "../utils/utils";
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

const Home = () => {
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  const [query, setQuery] = useState("");
  //   const [filterSelections, setFilterSelections] = useState(
  //     sections.map(() => false)
  //   );
  //

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

  const renderItem = ({ item }) => (
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
  );
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Little Lemon</Text>
          <Text style={styles.subHeader}>Chicago</Text>
          <Text style={styles.body}>We are a family owned</Text>
          <Text style={styles.body}>Mediterranean restaurant,</Text>
          <Text style={styles.body}>focused on traditional</Text>
          <Text style={styles.body}>receipes served with a </Text>
          <Text style={styles.body}>modern twist.</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            // source={require("C:/Users/Admin/Shilpa/Coursera/little-lemon-capstone/assets/Hero_image.png")}
            source={require("../assets/Hero_image.png")}
            style={styles.heroImage}
          />
        </View>
        <View style={styles.searchContainer}>
          <Searchbar
            style={styles.searchBar}
            placeholder="Search"
            placeholderTextColor="#495E57"
            //   onChangeText={handleSearchChange}
            //   value={searchBarText}

            iconColor="#495E57"
            // inputStyle={{ color: "white" }}
            // elevation={0}
          />
        </View>
        {/* <Filters
          selections={filterSelections}
          onChange={handleFiltersChange}
          sections={sections}
        /> */}
      </View>

      <Text style={styles.orderTab}>ORDER FOR DELIVERY!</Text>
      {/* <View style={styles.tab}>
        <Pressable>
          <Text style={styles.tabItem}>Starters</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.tabItem}>Mains</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.tabItem}>Desserts</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.tabItem}>Drinks</Text>
        </Pressable>
      </View> */}
      <View style={styles.tab}>
        {uniqueCategories.map((category) => (
          <Pressable key={category}>
            <Text style={styles.tabItem}>{category}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.listView}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.name} // Assuming 'name' is a unique identifier
          renderItem={renderItem}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.52,
    backgroundColor: "#495E57",
    flexDirection: "row",
  },
  header: {
    fontSize: 45,
    color: "#F4CE14",
    marginLeft: 15,
    marginTop: 10,
  },
  subHeader: {
    fontSize: 40,
    color: "#EDEFEE",
    marginLeft: 15,
    marginBottom: 20,
  },
  body: {
    fontSize: 15,
    color: "#EDEFEE",
    marginLeft: 15,
  },
  imageContainer: {
    flex: 1,
  },
  heroImage: {
    height: 140,
    width: 140,
    resizeMode: "contain",
    borderRadius: 8,
    marginTop: 100,
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
  // searchContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  searchBar: {
    marginTop: 260,
    marginRight: 200,
    borderRadius: 8,
    height: 50,
    width: 300,
    color: "#495E57",
  },
  listView: {
    flex: 0.5,
    backgroundColor: "white",
  },
  menuItemTextContainer: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 10,
  },
  menuItemContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#495E57",
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
