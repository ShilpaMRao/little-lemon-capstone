import { useRef, useEffect } from "react";

export const SECTION_LIST_MOCK_DATA = [
  {
    title: "Appetizers",
    data: [
      {
        id: "1",
        title: "Pasta",
        price: "10",
      },
      {
        id: "3",
        title: "Pizza",
        price: "8",
      },
    ],
  },
  {
    title: "Salads",
    data: [
      {
        id: "2",
        title: "Caesar",
        price: "2",
      },
      {
        id: "4",
        title: "Greek",
        price: "3",
      },
    ],
  },
];

/**
 * 3. Implement this function to transform the raw data
 * retrieved by the getMenuItems() function inside the database.js file
 * into the data structure a SectionList component expects as its "sections" prop.
 * @see https://reactnative.dev/docs/sectionlist as a reference
 */
// Solution from coursera
// export function getSectionListData(data) {
//   const dataByCategory = data.reduce((acc, curr) => {
//     const menuItem = {
//       id: curr.id,
//       title: curr.title,
//       price: curr.price,
//     };
//     if (!Array.isArray(acc[curr.category])) {
//       acc[curr.category] = [menuItem];
//     } else {
//       acc[curr.category].push(menuItem);
//     }
//     return acc;
//   }, {});
//   const sectionListData = Object.entries(dataByCategory).map(([key, item]) => {
//     return {
//       title: key,
//       data: item,
//     };
//   });
//   return sectionListData;
//  }
export function getSectionListData(items) {
  const titles = new Set([...items.map((item) => item.category)]);
  const response = Array.from(titles).map((title) => {
    return {
      title,
      data: items
        .filter((item) => item.category === title)
        .map((item) => {
          return { id: item.id, title: item.title, price: item.price };
        }),
    };
  });
  // SECTION_LIST_MOCK_DATA is an example of the data structure you need to return from this function.
  // The title of each section should be the category.
  // The data property should contain an array of menu items.
  // Each item has the following properties: "id", "title" and "price"
  return response;
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}
