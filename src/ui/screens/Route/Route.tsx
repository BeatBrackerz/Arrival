import React from 'react';
import { View} from "react-native";
import Map from '../../components/Map/Map';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import NavigateCard from "../../components/Navigation/NavigateCard";
import VehicleOptionsCard from "../../components/Vehicle/VehicleOptionsCard";

const Route = () => {
    const Stack = createNativeStackNavigator();

    return(
            <View>
                <View className="h-1/2">
                    <Map />
                </View>
                <View className="h-1/2">
                    <Stack.Navigator>
                        <Stack.Screen
                            name="NavigateCard"
                            component={NavigateCard}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="VehicleOptionsCard"
                            component={VehicleOptionsCard}
                            options={{
                                headerShown: false
                            }}
                        />
                    </Stack.Navigator>
                </View>
            </View>
    )
};

export default Route;