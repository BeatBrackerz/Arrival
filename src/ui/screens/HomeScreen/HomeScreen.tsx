import React from 'react';
import {View, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// @ts-ignore
import {GOOGLE_MAPS_APIKEY} from '@env';
import {useColorScheme} from 'nativewind';
import {useDispatch} from 'react-redux';
import {setDestination, setOrigin} from '../../../utils/store/slices/navSlice';
import AnimatedView from '../../components/Parallax/AnmiatedView';
import {StatusBar} from 'expo-status-bar';

const HomeScreen = () => {
  const {colorScheme} = useColorScheme();
  const dispatch = useDispatch();

  return (
    <View>
      <StatusBar style="light" />
      <AnimatedView order={2}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 p-5 mt-24 w-full">
            {/*
            <GooglePlacesAutocomplete
              debounce={400}
              minLength={2}
              enablePoweredByContainer={false}
              nearbyPlacesAPI="GooglePlacesSearch"
              placeholder="Searching for a parking spot"
              // @ts-ignore
              returnKeyType={'default'}
              fetchDetails={true}
              onPress={(data, details = null) => {
                dispatch(
                  setOrigin({
                    // @ts-ignore
                    location: details.geometry.location,
                    description: data.description,
                  }),
                );

                dispatch(setDestination(null));
              }}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en',
              }}
              styles={{
                container: {
                  flex: 0,
                },
                textInput: {
                  backgroundColor: '#334155',
                  color: 'white',
                },
              }}
            />

            */}
          </View>
        </TouchableWithoutFeedback>
      </AnimatedView>
    </View>
  );
};

export default HomeScreen;
