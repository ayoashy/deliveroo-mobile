import { ScrollView, Text, View } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import sanityClient, { urlFor } from '../sanity';

const Kategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "category"]
    `
      )
      .then((data) => setCategories(data));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
    >
      {categories.map((category) => (
        <CategoryCard
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
          key={category._id}
        />
      ))}
    </ScrollView>
  );
};

export default Kategories;
