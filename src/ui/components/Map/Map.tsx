import React, {useEffect, useRef} from 'react';
import MapView, {Marker} from "react-native-maps";

import {useDispatch, useSelector} from "react-redux";
import {selectDestination, selectOrigin, setTravelTimeInformation} from "../../../utils/store/slices/navSlice";
import MapViewDirections from "react-native-maps-directions";

// @ts-ignore
import { GOOGLE_MAPS_APIKEY } from '@env';

const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!origin || !destination) return;

        // Zoom
        // @ts-ignore
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: {
                top: 50,
                right: 50,
                bottom: 50,
                left: 50
            },
        });
    }, [origin, destination]);

    useEffect(() => {
        if (!origin || !destination) return;
        const getTravelTime = async () => {
                fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`)
                    .then(res => res.json())
                    .then(data => {
                        dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
                    });

        };

        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_APIKEY]);

    return(
        <MapView
            ref={mapRef}
            className="flex-1"
            mapType="mutedStandard"
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }}
        >
            {origin && destination && (
                <MapViewDirections apikey={GOOGLE_MAPS_APIKEY} origin={origin.description} destination={destination.description} strokeColor="black" strokeWidth={3} />
            )}

            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier="origin"
                />
            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier="destination"
                />
            )}
        </MapView>
    )
};

export default Map;