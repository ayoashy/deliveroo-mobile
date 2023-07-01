import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectBasketTotal } from '../features/basketSlice';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BasketIcon = () => {
  const basketTotal = useSelector(selectBasketTotal);
  const navigation = useNavigation();
  const items = useSelector((state) => state.basket.items);

  if (items.length === 0) return null;

  return (
    <View className='absolute bottom-10 w-full z-50'>
      <TouchableOpacity
        onPress={() => navigation.navigate('Basket', { items })}
        className='mx-5 bg-[#00ccbb] p-4 rounded-lg flex-row items-center space-x-1'
      >
        <Text className='text-white font-extrabold text-lg bg-[#01a296] py-1 px-2'>
          {items.length}
        </Text>
        <Text className='flex-1 text-white font-extrabold text-lg text-center'>
          View Basket
        </Text>
        <Text className='text-lg text-white font-extrabold'>
          £{basketTotal}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;

const styles = StyleSheet.create({});
