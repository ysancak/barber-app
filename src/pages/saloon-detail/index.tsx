import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BusinessInfo from './components/BusinessInfo';
import CategoryList from './components/CategoryList';
import Reviews from './components/Reviews';
import ServiceItem from './components/ServiceItem';

import Gallery from '@/components/Gallery';
import Text from '@/components/Text';
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
          <View style={styles.textContainer}>
            <Text variant="title" fontSize={22} style={styles.title}>
              Chic Coiffeour
            </Text>
            <Text style={styles.subtitle}>Kreis 1,Zürich</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={22} color="#ffa800" />
              <Icon name="star" size={22} color="#ffa800" />
              <Icon name="star" size={22} color="#ffa800" />
              <Icon name="star" size={22} color="#ffa800" />
              <Icon name="star-half" size={22} color="#ffa800" />
              <Text variant="caption" style={styles.reviewText}>
                (2 Bewertungen)
              </Text>
            </View>
          </View>
        </View>

        <View style={{gap: 35}}>
          <View>
            <CategoryList onChange={console.log} />
            <View style={{gap: 12, paddingHorizontal: 16}}>
              <ServiceItem />
              <ServiceItem />
              <ServiceItem />
            </View>
          </View>

          <View style={{paddingHorizontal: 16, gap: 35}}>
            <Gallery />

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
  },
  avatarImage: {
    width: 86,
    height: 86,
    borderRadius: 99,
  },
  textContainer: {
    marginLeft: 16,
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
