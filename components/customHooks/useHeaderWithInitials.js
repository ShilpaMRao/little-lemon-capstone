import { useLayoutEffect } from "react";
import { View, Pressable } from "react-native";
import RenderInitials from "../../utils/RenderInitials";

const useHeaderWithInitials = (navigation, initials, avatar) => {
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
};

export default useHeaderWithInitials;
