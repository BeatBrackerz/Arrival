import {Icon} from 'react-native-elements';
import {Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {useColorScheme} from 'nativewind';
import Animated, {
  Layout,
  SlideInLeft,
  SlideOutRight,
} from 'react-native-reanimated';

const NavListItem: FC<any> = ({location, destination, icon, index}) => {
  const {colorScheme} = useColorScheme();

  return (
    <Animated.View
      entering={SlideInLeft.delay(index * 100)}
      exiting={SlideOutRight}
      layout={Layout.springify()}
    >
      <TouchableOpacity className="flex-row items-center p-5">
        <Icon
          className="mr-4 rounded-full bg-gray-300 p-3 dark:bg-slate-500"
          name={icon}
          type="ionicon"
          color={colorScheme === 'light' ? 'white' : 'black'}
          size={18}
        />
        <View>
          <Text className="font-semibold text-lg text-black dark:text-white">
            {location}
          </Text>
          <Text className="text-gray-500 dark:text-slate-500">
            {destination}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default NavListItem;
