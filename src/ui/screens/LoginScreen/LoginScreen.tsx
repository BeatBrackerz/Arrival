import {useNavigation} from '@react-navigation/native';
import {useSupabase} from '../../../utils/supabase';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon, Input} from '@rneui/themed';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOutDown,
  FadeOutLeft,
  FadeOutRight,
} from 'react-native-reanimated';
import {StatusBar} from 'expo-status-bar';
import AnimatedView from '../../components/Parallax/AnmiatedView';
import {BlurView} from 'expo-blur';

const LoginScreen = () => {
  const navigation = useNavigation();
  const {login} = useSupabase();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
              className="flex-1"
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={80}
            >
              <Animated.View entering={FadeIn.duration(1400)}>
                <BlurView
                  className="px-2 border border-gray-500"
                  intensity={5}
                >
                  <Animated.View
                    entering={FadeIn.delay(1400).duration(1000)}
                    exiting={FadeOutLeft.delay(600).duration(500)}
                    className="mt-14"
                  >
                    <Text className="font-semibold uppercase text-5xl text-white text-center">
                      Hello Friend!
                    </Text>
                  </Animated.View>
                  <Animated.Text
                    entering={FadeIn.delay(2000).duration(1000)}
                    exiting={FadeOutLeft.delay(300).duration(500)}
                    className="text-gray-400 mt-1 text-center"
                  >
                    Welcome back you've been missed!
                  </Animated.Text>

                  <Animated.View
                    entering={FadeIn.delay(2600).duration(1000)}
                    exiting={FadeOutRight.delay(400).duration(500)}
                    className="mt-8"
                  >
                    <Input
                      leftIcon={{
                        type: 'font-awesome-5',
                        name: 'user',
                        color: 'white',
                        style: {marginLeft: 5, marginRight: 10},
                      }}
                      onChangeText={text => setEmail(text)}
                      value={email}
                      keyboardType="email-address"
                      placeholder="Email"
                      autoCapitalize="none"
                      autoComplete="email"
                      textContentType="emailAddress"
                      returnKeyType="next"
                      className="text-white"
                      inputContainerStyle={{
                        padding: 10,
                        borderWidth: 1,
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      }}
                    />
                  </Animated.View>
                  <Animated.View
                    entering={FadeIn.delay(2600).duration(1000)}
                    exiting={FadeOutRight.delay(300).duration(500)}
                    className="-mt-6"
                  >
                    <Input
                      leftIcon={{
                        type: 'font-awesome-5',
                        name: 'lock',
                        color: 'white',
                        style: {marginRight: 10, marginLeft: 5},
                      }}
                      onChangeText={text => setPassword(text)}
                      value={password}
                      secureTextEntry={!showPwd}
                      placeholder="Password"
                      autoCapitalize="none"
                      returnKeyType="done"
                      className="text-white"
                      rightIcon={{
                        type: 'font-awesome-5',
                        name: showPwd ? 'eye-slash' : 'eye',
                        color: 'rgba(255,255,255,0.5)',
                        style: {marginLeft: 10, marginRight: 5},
                        onPress: () => setShowPwd(!showPwd),
                      }}
                      inputContainerStyle={{
                        padding: 10,
                        borderWidth: 1,
                        borderTopWidth: 0,
                        borderBottomLeftRadius: 25,
                        borderBottomRightRadius: 25,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      }}
                    />
                  </Animated.View>
                </BlurView>
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(600).duration(1000)}
                exiting={FadeOutDown.duration(500)}
                className="mt-auto mb-4"
              >
                <TouchableOpacity
                  disabled={loading || email === '' || password === ''}
                  onPress={onSignInTapped}
                  className={`flex-row items-center justify-center bg-amber-200 py-3 rounded-lg ${
                    (loading || email === '' || password === '') &&
                    'bg-slate-400 opacity-60'
                  }`}
                >
                  {loading ? (
                    <Text
                      className={`font-bold text-center text-lg ${
                        loading || email === '' || password === ''
                          ? 'text-white'
                          : 'text-black'
                      }`}
                    >
                      <ActivityIndicator />
                    </Text>
                  ) : (
                    <>
                      <Icon
                        className="mr-2"
                        name="sign-in-alt"
                        type="font-awesome-5"
                        color={
                          loading || email === '' || password === ''
                            ? 'white'
                            : 'black'
                        }
                        size={20}
                      />
                      <Text
                        className={`font-bold text-center text-lg ${
                          loading || email === '' || password === ''
                            ? 'text-white'
                            : 'text-black'
                        }`}
                      >
                        Sign In
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </Animated.View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </AnimatedView>
    </>
  );
};

export default LoginScreen;
