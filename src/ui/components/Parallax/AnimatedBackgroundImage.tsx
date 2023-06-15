import {useWindowDimensions, View} from 'react-native';
import Animated, {
  interpolate,
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import React, {FC, HTMLAttributes} from 'react';

const IMAGE_OFFSET = 50;

interface AnimatedBackgroundImageProps
  extends JSX.IntrinsicAttributes,
    HTMLAttributes<HTMLElement> {
  src: any;
  order?: number;
}

const AnimatedBackgroundImage: FC<AnimatedBackgroundImageProps> = ({
  src,
  order = 1,
}) => {
  const {width, height} = useWindowDimensions();
  const sensor = useAnimatedSensor(SensorType.ROTATION);

  const imageStyle = useAnimatedStyle(() => {
    const {pitch, roll} = sensor.sensor.value;

    return {
      top: withTiming(
        interpolate(
          pitch,
          [-Math.PI / 2, Math.PI / 2],
          [(-IMAGE_OFFSET * 2) / order, 0],
        ),
        {duration: 100},
      ),
      left: withTiming(
        interpolate(
          roll,
          [-Math.PI, Math.PI],
          [(-IMAGE_OFFSET * 2) / order, 0],
        ),
        {duration: 100},
      ),
    };
  });

  return (
    <View className="absolute flex-1 items-center justify-center">
      <Animated.Image
        source={src}
        style={[
          {
            position: 'absolute',
            width: width + (2 * IMAGE_OFFSET) / order,
            height: height + (2 * IMAGE_OFFSET) / order,
          },
          imageStyle,
        ]}
      />
    </View>
  );
};

export default React.memo(AnimatedBackgroundImage);
