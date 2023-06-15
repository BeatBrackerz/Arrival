import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Avatar from "../../components/Avatar/Avatar";
import { Image } from "react-native";
import React from "react";

const Drawer = createDrawerNavigator();
const HomeStack = () => {
  return (
    <Drawer.Navigator initialRouteName="HomeScreen" >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          drawerType: "front",
          headerTitle: () => (
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png",
              }}
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
                marginLeft: 30,
              }}
            />
          ),
          headerRight: () => <Avatar size={40} className="pr-5" />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeStack;
