import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import AnimatedView from '../../components/Parallax/AnmiatedView';
import {StatusBar} from 'expo-status-bar';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInUp,
  FadeOutDown,
  FadeOutLeft,
  FadeOutUp,
} from 'react-native-reanimated';
import {Icon} from '@rneui/themed';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import delay from '../../../utils/delay/delay';

//@ts-ignore
import logo from '../../../assets/Arrival_horizontal.png';

const GetStartedScreen = () => {
  const navigation = useNavigation();
  const [navigate, setNavigate] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setNavigate(false);
    }, []),
  );

  const animatedNavigation = async () => {
    setNavigate(true);
    await delay(1000);

    // @ts-ignore
    navigation.navigate('AuthStack');
  };

  return (
    <>
      <StatusBar style="light" />
      <AnimatedView order={6}>
        {!navigate && (
          <SafeAreaView className="p-5">
            <View className="flex-1 justify-items-center mt-10">
              <Animated.Image
                entering={FadeInUp.delay(200).duration(1000)}
                exiting={FadeOutUp.delay(600).duration(500)}
                source={logo}
                className="mt-14"
              />
              <Animated.Text
                entering={FadeInLeft.delay(800).duration(1000)}
                exiting={FadeOutLeft.delay(300).duration(500)}
                className="font-semibold text-white mt-4"
              >
                Say goodbye to the hassle of finding parking spots and hello to
                stress-free-parking!
              </Animated.Text>
            </View>

            <Animated.View
              entering={FadeInDown.delay(1400).duration(1000)}
              exiting={FadeOutDown.duration(500)}
              className="mt-auto mb-4"
            >
              <TouchableOpacity
                // @ts-ignore
                onPress={() => animatedNavigation()}
                className={`flex-row items-center justify-center bg-amber-200 py-3 rounded-lg`}
              >
                <Icon
                  className="mr-2"
                  name="road"
                  type="font-awesome"
                  color="black"
                  size={20}
                />
                <Text className="font-bold text-center text-lg text-black">
                  Let's start
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </SafeAreaView>
        )}
      </AnimatedView>
    </>
  );
};

export default GetStartedScreen;
