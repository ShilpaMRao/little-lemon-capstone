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
const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";
const sections = ["Appetizers", "Salads", "Beverages"];
const fetchData = async () => {
  const response = await fetch(API_URL);
  const json = await response.json();

  const menuItems = json.menu.map((item) => ({
    ...item,
    category: item.category.title,
  }));

  return menuItems;
};

useEffect(() => {
  (async () => {
    try {
      await createTable();
      let menuItems = await getMenuItems();
      // The application only fetches the menu data once from a remote URL
      // and then stores it into a SQLite database.
      // After that, every application restart loads the menu from the database
      if (!menuItems.length) {
        const menuItems = await fetchData();
        saveMenuItems(menuItems);
      }
      const sectionListData = getSectionListData(menuItems);
      setData(sectionListData);
    } catch (e) {
      // Handle error
      Alert.alert(e.message);
    }
  })();
}, []);

useUpdateEffect(() => {
  (async () => {
    const activeCategories = sections.filter((s, i) => {
      // If all filters are deselected, all categories are active
      if (filterSelections.every((item) => item === false)) {
        return true;
      }
      return filterSelections[i];
    });
    try {
      const menuItems = await filterByQueryAndCategories(
        query,
        activeCategories
      );
      const sectionListData = getSectionListData(menuItems);
      setData(sectionListData);
    } catch (e) {
      Alert.alert(e.message);
    }
  })();
}, [filterSelections, query]);

const lookup = useCallback((q) => {
  setQuery(q);
}, []);

const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

const handleSearchChange = (text) => {
  setSearchBarText(text);
  debouncedLookup(text);
};

const handleFiltersChange = async (index) => {
  const arrayCopy = [...filterSelections];
  arrayCopy[index] = !filterSelections[index];
  setFilterSelections(arrayCopy);
};
const Item = ({ name, price }) => (
  <View style={menuStyles.innerContainer}>
    <Text style={menuStyles.itemText}>{name}</Text>
    <Text style={menuStyles.itemText}>${price}</Text>
  </View>
);

const Separator = () => <View style={menuStyles.separator} />;

const Home = () => {
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState("");
  const [query, setQuery] = useState("");
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );
  const renderItem = ({ item }) => (
    <Item name={item.title} price={item.price} />
  );
  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
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
            source={require("C:/Users/Admin/Shilpa/Coursera/little-lemon-capstone/assets/Hero_image.png")}
            style={styles.heroImage}
          />
        </View>
        <Searchbar
          placeholder="Search"
          placeholderTextColor="white"
          onChangeText={handleSearchChange}
          value={searchBarText}
          style={styles.searchBar}
          iconColor="white"
          inputStyle={{ color: "white" }}
          elevation={0}
        />
        <Filters
          selections={filterSelections}
          onChange={handleFiltersChange}
          sections={sections}
        />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={Separator}
        />
      </View>

      <Text style={styles.orderTab}>ORDER FOR DELIVERY!</Text>
      <View style={styles.tab}>
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
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.45,
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
    fontSize: 30,
    padding: 20,
    fontWeight: "bold",
    backgroundColor: "white",
  },
  tab: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  tabItem: {
    backgroundColor: "#EDEFEE",
    padding: 20,
    marginLeft: 10,
    fontSize: 15,
    borderRadius: 8,
    color: "#495E57",
    fontWeight: "bold",
  },
});

export default Home;
