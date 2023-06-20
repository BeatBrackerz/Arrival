import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// @ts-ignore
import {GOOGLE_MAPS_APIKEY} from '@env';
import {setDestination} from '../../../utils/store/slices/navSlice';
import {useDispatch} from 'react-redux';
import {useColorScheme} from 'nativewind';
import {useNavigation} from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import {Icon} from '@rneui/themed';

const NavigateCard = () => {
  const {colorScheme} = useColorScheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-800">
      <View>
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.navigate('Home')}
          className="absolute top-3 left-5 p-3 z-50 rounded-full"
        >
          <Icon
            name="chevron-left"
            type="fontawesome"
            color={colorScheme === 'light' ? 'black' : 'white'}
          />
        </TouchableOpacity>
        <Text className="text-center py-5 text-xl font-semibold text-black dark:text-white">
          Good Morning, Yannic
        </Text>
        <View className="border-t border-gray-200 flex-shrink dark:bg-slate-700" />

        <View>
          <GooglePlacesAutocomplete
            debounce={400}
            minLength={2}
            enablePoweredByContainer={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            placeholder="Searching Places..."
            // @ts-ignore
            returnKeyType={'default'}
            fetchDetails={true}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  // @ts-ignore
                  location: details.geometry.location,
                  description: data.description,
                }),
              );

              // @ts-ignore
              navigation.navigate('VehicleOptionsCard');
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            styles={{
              container: {
                flex: 0,
                paddingTop: 20,
              },
              textInput: {
                fontSize: 18,
                backgroundColor:
                  colorScheme === 'light' ? '#e5e7eb' : '#334155',
                color: colorScheme === 'light' ? 'black' : 'white',
              },
              textInputContainer: {
                paddingHorizontal: 20,
                paddingBottom: 0,
              },
            }}
          />
        </View>
        <NavFavourites />
      </View>

      <View className="flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100 dark:bg-slate-800">
        <TouchableOpacity
          className="flex flex-row justify-around bg-black w-28 px-4 py-3 rounded-full dark:bg-white"
          // @ts-ignore
          onPress={() => navigation.navigate('VehicleOptionsCard')}
        >
          <Icon
            name="car"
            type="font-awesome"
            color={colorScheme === 'light' ? 'white' : 'black'}
            size={16}
          />
          <Text className="text-white text-center dark:text-black">
            Vehicles
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-row justify-around bg-black w-28 px-4 py-3 rounded-full dark:bg-white">
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color={colorScheme === 'light' ? 'white' : 'black'}
            size={16}
          />
          <Text className="text-white text-center dark:text-black">Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;
