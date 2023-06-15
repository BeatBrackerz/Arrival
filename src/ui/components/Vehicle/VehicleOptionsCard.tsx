import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useColorScheme} from 'nativewind';
import {useSelector} from 'react-redux';
import {selectTravelTimeInformation} from '../../../utils/store/slices/navSlice';

const data = [
  {
    id: 'Uber-X-123',
    title: 'Uber X',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn',
  },
  {
    id: 'Uber-XL-456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8',
  },
  {
    id: 'Uber-LUX-789',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf',
  },
];

// If we have SURGE pricing, this is up!
const SURGE_CHARGE_RATE = 1.5;

const VehicleOptionsCard = () => {
  const {colorScheme} = useColorScheme();
  const navigation = useNavigation();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  const [selected, setSelected] = useState<any>(null);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-slate-800">
      <View>
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.navigate('NavigateCard')}
          className="absolute top-3 left-5 p-3 z-50 rounded-full"
        >
          <Icon
            name="chevron-left"
            type="fontawesome"
            color={colorScheme === 'light' ? 'black' : 'white'}
          />
        </TouchableOpacity>
        <Text className="text-center pt-3 text-xl font-semibold text-black dark:text-white">
          Select your Vehicle
        </Text>
        <Text className="text-center pb-3 text-xs text-black dark:text-white">
          ~ {travelTimeInformation?.distance.text}
        </Text>
        <View className="border-t border-gray-200 flex-shrink dark:bg-slate-700" />
      </View>

      <FlatList
        keyExtractor={item => item.id}
        data={data}
        renderItem={({item: {id, title, multiplier, image}, item}) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            className={`flex-row items-center justify-between px-10 ${
              id === selected?.id && 'bg-gray-200 dark:bg-slate-700'
            }`}
          >
            <Image
              style={{width: 100, height: 100, resizeMode: 'contain'}}
              source={{uri: image}}
            />
            <View className="-ml-6">
              <Text className="text-xl font-semibold text-black dark:text-white">
                {title}
              </Text>
              <Text className="text-xs text-black dark:text-white">
                {travelTimeInformation?.duration.text} Travel Time
              </Text>
            </View>
            <Text className="text-xl text-black dark:text-white">
              {new Intl.NumberFormat('de', {
                style: 'currency',
                currency: 'EUR',
              }).format(
                (travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100,
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View className="border-t border-gray-200 flex-shrink dark:bg-slate-700" />

      <View className="mt-auto">
        <TouchableOpacity
          disabled={!selected}
          className={`bg-black dark:bg-white py-3 m-3 rounded-lg ${
            !selected && 'bg-gray-300 dark:bg-slate-500'
          }`}
        >
          <Text className="text-center text-xl text-white dark:text-black">
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VehicleOptionsCard;
