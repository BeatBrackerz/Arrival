import {
  DrawerContentComponentProps,
  DrawerItem,
  DrawerItemList,
  useDrawerProgress,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import {BlurView} from 'expo-blur';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';

//@ts-ignore
import logo from '../../../assets/Arrival_horizontal.png';

const DrawerMenu = (props: DrawerContentComponentProps) => {
  const progress = useDrawerProgress();

  // @ts-ignore
  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  // @ts-ignore
  const translateY = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  return (
    <BlurView
      intensity={24}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 justify-between">
        <Animated.Image
          source={logo}
          style={{
            alignSelf: 'center',
            width: 240,
            resizeMode: 'contain',
            transform: [{translateX}],
          }}
        />
        <View className="flex-1">
          <ScrollView
            {...props}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={{transform: [{translateX}]}}>
              <DrawerItemList {...props} />
            </Animated.View>
          </ScrollView>
        </View>
        <Animated.View
          className="flex border-t border-gray-600 mx-3"
          style={{transform: [{translateX}]}}
        >
          <Text className="text-gray-600  my-4">SETTINGS</Text>
          <DrawerItem
            label="User"
            style={{
              backgroundColor: 'transparent',
              marginHorizontal: -6,
              paddingHorizontal: 10,
            }}
            labelStyle={{color: 'white'}}
            onPress={() => console.log('User')}
          />
          <DrawerItem
            label="Settings"
            style={{
              backgroundColor: 'transparent',
              marginHorizontal: -6,
              paddingHorizontal: 10,
            }}
            labelStyle={{color: 'white'}}
            onPress={() => console.log('Settings')}
          />
          <DrawerItem
            label="Logout"
            style={{
              backgroundColor: 'transparent',
              marginHorizontal: -6,
              paddingHorizontal: 10,
            }}
            labelStyle={{color: 'white'}}
            onPress={() => console.log('Logout')}
          />
        </Animated.View>
        <Animated.Text
          className="text-gray-600 self-center"
          style={{fontSize: 8, transform: [{translateY}]}}
          onPress={() => console.log('Link to Website')}
        >
          © {new Date().getFullYear()} Gerhard & Hammer GbR
        </Animated.Text>
      </SafeAreaView>
    </BlurView>
  );
};

export default DrawerMenu;
