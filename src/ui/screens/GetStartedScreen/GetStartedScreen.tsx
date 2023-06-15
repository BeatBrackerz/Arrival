import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import AnimatedBackgroundImage from "../../components/Parallax/AnimatedBackgroundImage";
import AnimatedView from "../../components/Parallax/AnmiatedView";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeOutDown,
  FadeOutLeft,
} from "react-native-reanimated";
import { Icon } from "react-native-elements";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import delay from "../../../utils/delay/delay";

// @ts-ignore
import bg from "../../../assets/Background.jpg";

const GetStartedScreen = () => {
  const navigation = useNavigation();
  const [navigate, setNavigate] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setNavigate(false);
    }, [])
  );

  const animatedNavigation = async () => {
    setNavigate(true);
    await delay(1500);

    // @ts-ignore
    navigation.navigate("AuthStack");
  };

  return (
    <Animated.View>
      <StatusBar style="light" />
      <AnimatedView order={6}>
        {!navigate && (
          <SafeAreaView className="p-5">
            <View className="flex-1 justify-items-center mt-10">
              <Animated.Text
                entering={FadeInLeft.delay(200).duration(1000)}
                exiting={FadeOutLeft.delay(600).duration(500)}
                className="font-bold uppercase text-6xl text-white mt-14"
              >
                Arrival
              </Animated.Text>
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
    </Animated.View>
  );
};

export default GetStartedScreen;
