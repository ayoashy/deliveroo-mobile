import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { selectRestaurant } from '../features/restaurantSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { ScrollView } from 'react-native-gesture-handler';
import { urlFor } from '../sanity';
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
  selectBasketTotal,
} from '../features/basketSlice';

const BasketScreen = () => {
  const items = useSelector(selectBasketItems);
  const restaurants = useSelector(selectRestaurant);
  const basketTotal = useSelector(selectBasketTotal);
  const navigation = useNavigation();
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('====================================');
    console.log(items);
    console.log('====================================');
    if (items && items.length > 0) {
      const groupedItems = items.reduce((results, item) => {
        (results[item.id] = results[item.id] || []).push(item);
        return results;
      }, {});
      setGroupedItemsInBasket(groupedItems);
    } else {
      navigation.goBack();
    }
  }, [items]);

  return (
    <SafeAreaView style={styles.container} className='flex-1 bg-white'>
      <View className='flex-1 bg-gray-100'>
        <View className='p-5 border-b border-[#00ccbb] bg-white shadow-xs'>
          <View>
            <Text className='text-lg font-bold text-center'>Basket</Text>
            <Text className='text-center text-gray-400'>
              {restaurants.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className='rounded-full bg-gray-500 absolute top-3 right-5'
          >
            <XCircleIcon color={'#00ccbb'} height={50} width={50} />
          </TouchableOpacity>
        </View>
        <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
          <Image
            source={{
              uri: 'https://links.papareact.com/wru',
            }}
            className='h-7 w-7 bg-gray-300 p-4 rounded-full'
          />
          <Text className='flex-1'>Deliver in 50-75 mins</Text>
          <TouchableOpacity>
            <Text className='text-[#00CCBB]'>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className='divide-y divide-gray-200'>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className='flex-row items-center space-x-3 bg-white py-2  px-5'
            >
              <Text className='text-[#00CCBB]'>{items.length} x</Text>
              <Image
                source={{
                  uri: urlFor(items[0]?.image).url(),
                }}
                className='h-12 w-12 rounded-full'
              />
              <Text className='flex-1'>{items[0]?.name}</Text>
              <Text>£{items[0]?.price}</Text>
              <TouchableOpacity>
                <Text
                  className='text-[#00CCBB] text-xs'
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className='p-5 bg-white mt-5 space-y-4'>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400 '>Subtotal</Text>
            <Text className='text-gray-400'>£{basketTotal}</Text>
          </View>

          <View className='flex-row justify-between'>
            <Text className='text-gray-400 '>Delivery Fee</Text>
            <Text className='text-gray-400'>£5.99</Text>
          </View>

          <View className='flex-row justify-between'>
            <Text> Order Total</Text>
            <Text className='font-extrabold'>£{5.99 + basketTotal}</Text>
          </View>
          <TouchableOpacity
            className='rounded-lg bg-[#00CCBB] p-4'
            onPress={() => navigation.navigate('PreparingOrderScreen')}
          >
            <Text className='text-center text-white text-lg font-bold'>
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
});
