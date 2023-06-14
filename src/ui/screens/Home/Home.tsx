import React from 'react';
import {View, Image} from "react-native";
import NavOptions from "../../components/Navigation/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// @ts-ignore
import { GOOGLE_MAPS_APIKEY } from '@env';
import {useColorScheme} from "nativewind";
import {useDispatch} from "react-redux";
import {setDestination, setOrigin} from "../../../utils/store/slices/navSlice";
import NavFavourites from "../../components/Navigation/NavFavourites";
import AnimatedView from "../../components/Parallax/AnmiatedView";
import AnimatedBackgroundImage from "../../components/Parallax/AnimatedBackgroundImage";

const Home = () => {
    const {colorScheme} = useColorScheme();
    const dispatch = useDispatch();

  return(
      <View>
          <AnimatedBackgroundImage src={
              {uri: 'https://images.pexels.com/photos/9503239/pexels-photo-9503239.jpeg'}
          } order={1} />
          <AnimatedView order={2}>
              <View className="p-5">
                  <Image
                      source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png'}}
                      style={{
                          width: 100,
                          height:100,
                          resizeMode: 'contain'
                      }}
                  />

                  <GooglePlacesAutocomplete
                      debounce={400}
                      minLength={2}
                      enablePoweredByContainer={false}
                      nearbyPlacesAPI="GooglePlacesSearch"
                      placeholder="Searching Places..."
                      // @ts-ignore
                      returnKeyType={'default'}
                      fetchDetails={true}
                      onPress={(data,details = null) => {
                          dispatch(setOrigin({
                              // @ts-ignore
                              location: details.geometry.location,
                              description: data.description
                          }));

                          dispatch(setDestination(null));
                      }}
                      query={{
                          key: GOOGLE_MAPS_APIKEY,
                          language: 'en'
                      }}
                      styles={{
                          container: {
                              flex: 0
                          },
                          textInput: {
                              fontSize: 18,
                              backgroundColor: colorScheme === 'light' ? '#e5e7eb' : '#334155',
                              color: colorScheme === 'light' ? 'black' : 'white'
                          }
                      }}
                  />

                  <NavOptions />
                  <NavFavourites />
              </View>
          </AnimatedView>
      </View>
  )
};

export default Home;