import React, { useEffect, useState } from "react";
import { View, Image, Alert } from "react-native";
import NavOptions from "../../components/Navigation/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// @ts-ignore
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useColorScheme } from "nativewind";
import { useDispatch } from "react-redux";
import {
  setDestination,
  setOrigin,
} from "../../../utils/store/slices/navSlice";
import NavFavourites from "../../components/Navigation/NavFavourites";
import AnimatedView from "../../components/Parallax/AnmiatedView";
import {StatusBar} from "expo-status-bar";

const HomeScreen = () => {
  const { colorScheme } = useColorScheme();
  const dispatch = useDispatch();

  return (
    <View>
        <StatusBar style="light" />
      <AnimatedView order={2}>
        <View className="p-5 mt-24">
          <GooglePlacesAutocomplete
            debounce={400}
            minLength={2}
            enablePoweredByContainer={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            placeholder="Searching Places..."
            // @ts-ignore
            returnKeyType={"default"}
            fetchDetails={true}
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  // @ts-ignore
                  location: details.geometry.location,
                  description: data.description,
                })
              );

              dispatch(setDestination(null));
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
                backgroundColor:
                  colorScheme === "light" ? "#e5e7eb" : "#334155",
                color: colorScheme === "light" ? "black" : "white",
              },
            }}
          />

          <NavOptions />
          <NavFavourites />
        </View>
      </AnimatedView>
    </View>
  );
};

export default HomeScreen;
