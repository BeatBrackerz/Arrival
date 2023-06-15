import React from "react";
import { FlatList, TouchableOpacity, View, Text, Image } from "react-native";
import { Icon } from "react-native-elements";
import { useColorScheme } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../../../utils/store/slices/navSlice";

interface NavOptionsType {
  id: Number;
  title: String;
  image: String;
  screen: String;
}

const data: NavOptionsType[] = [
  {
    id: 123,
    title: "Get a ride",
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png",
    screen: "Map",
  },
  {
    id: 456,
    title: "Order food",
    image:
      "https://i.pinimg.com/originals/4f/eb/74/4feb745209cf7aba57463b20d27b61e3.png",
    screen: "Eats",
  },
];

const NavOptions = () => {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.navigate(item.screen)}
          className="p-2 pl-6 pt-4 bg-gray-200 m-2 w-40 rounded-lg dark:bg-slate-700"
          disabled={!origin}
        >
          <View className={`${!origin && "opacity-20"}`}>
            <Image
              // @ts-ignore
              source={{ uri: item.image }}
              style={{ width: 120, height: 120, resizeMode: "contain" }}
            />
            <Text className="mt-2 text-lg font-semibold text-black dark:text-white">
              {item.title}
            </Text>
            <Icon
              className="p-2 bg-black rounded-full w-10 mt-4 dark:bg-white"
              type="antdesign"
              name="arrowright"
              color={colorScheme === "light" ? "white" : "black"}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
