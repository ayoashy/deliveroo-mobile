import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import CurrencyFormat from 'react-currency-format';
import React from 'react';
import { urlFor } from '../sanity';

const DishRow = ({ name, id, description, price, image }) => {
  return (
    <TouchableOpacity>
      <View>
        <Text className='text-lg mb-1'>{name}</Text>
        <Text className='text-gray-400'>{description}</Text>
        <Text className='text-gray-400 mt-2'>
          {/* <CurrencyFormat quantity={price} currency='GBP' /> */}
        </Text>
      </View>
      <View>
        <Image
          style={{
            borderWidth: 1,
            borderColor: '#F3F3F4',
          }}
          source={{
            uri: urlFor(image).url(),
          }}
          className='h-20  w-20 bg-gray-300 p-4'
        />
      </View>
    </TouchableOpacity>
  );
};

export default DishRow;

const styles = StyleSheet.create({});
