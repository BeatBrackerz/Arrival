import {useNavigation} from '@react-navigation/native';
import {useSupabase} from '../../../utils/supabase';
import React, {useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Icon, Input} from 'react-native-elements';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';
import {StatusBar} from 'expo-status-bar';
import AnimatedView from '../../components/Parallax/AnmiatedView';

const LoginScreen = () => {
  const navigation = useNavigation();
  const {login} = useSupabase();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignInTapped = async () => {
    try {
      setLoading(true);
      await login(email, password);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <AnimatedView order={6}>
        <SafeAreaView className="flex-1 justify-items-center mt-10 w-full">
          <View className="text-white">
            <Input
              label="Email"
              leftIcon={{
                type: 'font-awesome-5',
                name: 'user',
                color: 'white',
                style: {marginRight: 5},
              }}
              onChangeText={text => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={'none'}
              className="text-white"
            />
          </View>
          <View className="py-4 self-stretch">
            <Input
              label="Password"
              leftIcon={{
                type: 'font-awesome-5',
                name: 'lock',
                color: 'white',
                style: {marginRight: 5},
              }}
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={'none'}
              className="text-white"
            />
          </View>

          <Animated.View
            entering={FadeInDown.delay(1400).duration(1000)}
            exiting={FadeOutDown.duration(500)}
            className="mt-auto mb-4"
          >
            <TouchableOpacity
              disabled={loading}
              onPress={onSignInTapped}
              className={`flex-row items-center justify-center bg-amber-200 py-3 rounded-lg ${
                loading && 'bg-slate-400'
              }`}
            >
              {loading ? (
                <Text className="font-bold text-center text-lg text-black">
                  'Lade...'
                </Text>
              ) : (
                <>
                  <Icon
                    className="mr-2"
                    name="sign-in-alt"
                    type="font-awesome-5"
                    color="black"
                    size={20}
                  />
                  <Text className="font-bold text-center text-lg text-black">
                    Sign In
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      </AnimatedView>
    </>
  );
};

export default LoginScreen;
