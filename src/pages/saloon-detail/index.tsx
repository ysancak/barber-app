import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import BusinessInfo from './components/BusinessInfo';
import ProductList from './components/ProductList';
import Reviews from './components/Reviews';
import ServiceList from './components/ServiceList';

import {ImageGallery, Rating, Text, View} from '@/components';
import {useNavigation} from '@/hooks/useNavigation';
import {colors} from '@/utils';

const SaloonDetail = () => {
  const navigation = useNavigation();

  navigation.setOptions({
    title: 'Chic Coiffeour',
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        <Image
          style={styles.headerImage}
          source={{
            uri: 'https://barberscout-8c49e53c42dc.herokuapp.com/assets/img/upload/b-2.webp',
          }}
        />

        <View style={styles.detailContainer}>
          <Image
            style={styles.avatarImage}
            source={{
              uri: 'https://barberscout-8c49e53c42dc.herokuapp.com/assets/img/upload/b-1.webp',
            }}
          />
          <View marginLeft={16}>
            <Text variant="title" fontSize={22} style={styles.title}>
              Chic Coiffeour
            </Text>
            <Text style={styles.subtitle}>Kreis 1,Zürich</Text>
            <Rating score={4.5} reviewCount={23} />
          </View>
        </View>

        <View gap={35} paddingVertical={20}>
          <ServiceList />
          <ProductList />
          <View paddingHorizontal={16} gap={35}>
            <ImageGallery
              images={[
                'https://barberscout-8c49e53c42dc.herokuapp.com/assets/img/upload/b-2.webp',
              ]}
            />
            <Reviews />
            <BusinessInfo />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SaloonDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  headerImage: {
    width: '100%',
    height: 220,
  },
  detailContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.whiteColor,
    borderBottomWidth: 1,
    borderColor: colors.borderColor2,
  },
  avatarImage: {
    width: 86,
    height: 86,
    borderRadius: 99,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewText: {
    marginLeft: 6,
  },
});
