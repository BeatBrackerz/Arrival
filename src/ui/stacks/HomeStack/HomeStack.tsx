import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Avatar from '../../components/Avatar/Avatar';
import {Image, View} from 'react-native';
import React from 'react';

//@ts-ignore
import logo from '../../../assets/Arrival_horizontal.png';
import DrawerMenu from '../../components/DrawerMenu/DrawerMenu';

const Drawer = createDrawerNavigator();
const HomeStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerMenu {...props} />}
      screenOptions={{
        sceneContainerStyle: {backgroundColor: 'transparent'},
        drawerStyle: {backgroundColor: 'transparent'},
        drawerActiveTintColor: 'black',
        drawerActiveBackgroundColor: 'rgba(253,230,138,0.8)',
        drawerInactiveTintColor: 'white',
        drawerInactiveBackgroundColor: 'transparent',
        drawerItemStyle: {
          borderRadius: 50,
          paddingHorizontal: 10,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          drawerType: 'front',
          headerTintColor: 'white',
          headerTitle: () => (
            <Image
              source={logo}
              style={{
                width: 120,
                height: 100,
                resizeMode: 'contain',
              }}
            />
          ),
          headerRight: () => (
            <View className="mr-5">
              <Avatar
                size={35}
                className="rounded-full border border-white"
              />
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeStack;
