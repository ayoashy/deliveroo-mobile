import React, { useLayoutEffect, useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassCircleIcon,
} from 'react-native-heroicons/outline';
import Kategories from '../components/Kategories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == 'featured']{
          ...,
          restaurants[]->{
            ...,
            dishes[]->
          }
        }`;

        const result = await sanityClient.fetch(query);
        setFeaturedCategories(result);
      } catch (error) {
        console.error('Error fetching data from Sanity:', error);
      }
    };

    fetchData();
  }, []);

  // console.log(featuredCategories, 'featuredCatgory');

  return (
    <SafeAreaView style={styles.container} className='bg-white pt-5'>
      <ScrollView>
        {/* header */}
        <View className='flex-row pb-3 items-center mx-4   space-x-2'>
          <Image
            source={{ uri: 'https://links.papareact.com/wru' }}
            className='h-7 w-7 bg-gray-300 p-4 rounded-full '
          />
          <View className='flex-1 '>
            <Text className='font-bold text-gray-400 text-xs'>Deliver now</Text>
            <View className='flex-row items-center'>
              <Text className='font-bold text-xl '>Current location</Text>
              <ChevronDownIcon color={'#00ccbb'} size={20} />
            </View>
          </View>
          <UserIcon color={'#00ccbb'} size={35} />
        </View>
        {/* search */}
        <View className='flex-row items-center space-x-2 pb-2 mx-4'>
          <View className='flex-row flex-1 space-x-2 bg-gray-200 p-3 rounded-sm'>
            <MagnifyingGlassCircleIcon color={'#00ccbb'} />
            <TextInput placeholder='Restaurant and cuisines' />
          </View>
          <AdjustmentsVerticalIcon color={'#00ccbb'} />
        </View>

        {/* Body */}

        <ScrollView>
          {/* categories */}
          <Kategories />

          {/* featured */}

          {featuredCategories?.map((category) => (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
});
