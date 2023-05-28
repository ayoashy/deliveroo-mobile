import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';

const CategoryCard = ({ title, imgUrl }) => {
  return (
    <TouchableOpacity className='relative mr-2 '>
      <Image
        className='w-20 h-20 rounded'
        source={{
          uri: imgUrl,
        }}
      />

      <Text className='absolute bottom-1 left-1 text-white font-bold'>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
