import {useWindowDimensions} from 'react-native';
import Animated, {
  interpolate,
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import React, {FC, HTMLAttributes} from 'react';

const OFFSET = 50;

interface AnimatedViewProps
  extends JSX.IntrinsicAttributes,
    HTMLAttributes<HTMLElement> {
  order?: number;
}

const AnimatedView: FC<AnimatedViewProps> = ({children, order = 1}) => {
  const {width, height} = useWindowDimensions();
  const sensor = useAnimatedSensor(SensorType.ROTATION);

  const imageStyle = useAnimatedStyle(() => {
    const {pitch, roll} = sensor.sensor.value;

    return {
      top: withTiming(
        interpolate(
          pitch,
          [-Math.PI / 2, Math.PI / 2],
          [(-OFFSET * 2) / order, 0],
        ),
        {duration: 100},
      ),
      left: withTiming(
        interpolate(roll, [-Math.PI, Math.PI], [(-OFFSET * 2) / order, 0]),
        {duration: 100},
      ),
    };
  });

  return (
    <Animated.View
      className="flex-1 items-center justify-center bg-transparent"
      style={[
        {
          position: 'absolute',
          width: width + (2 * OFFSET) / order,
          height: height + (2 * OFFSET) / order,
          padding: OFFSET / 2,
        },
        imageStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default React.memo(AnimatedView);
