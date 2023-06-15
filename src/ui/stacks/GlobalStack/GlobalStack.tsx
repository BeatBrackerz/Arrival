import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useSupabase} from '../../../utils/supabase';
import OnboardingStack from '../OnboardingStack/OnboardingStack';
import AuthStack from '../AuthStack/AuthStack';
import HomeStack from '../HomeStack/HomeStack';
//@ts-ignore
import bg from '../../../assets/Background.jpg';
import AnimatedBackgroundImage from '../../components/Parallax/AnimatedBackgroundImage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const GlobalStack = () => {
  const {isLoggedIn} = useSupabase();

  return (
    <NavigationContainer>
      <AnimatedBackgroundImage
        src={bg}
        order={1}
      />
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'HomeStack' : 'OnboardingStack'}
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: 'transparent'},
        }}
      >
        {isLoggedIn ? (
          <Stack.Screen
            name="HomeStack"
            component={HomeStack}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Stack.Screen
              name="OnboardingStack"
              component={OnboardingStack}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default GlobalStack;
