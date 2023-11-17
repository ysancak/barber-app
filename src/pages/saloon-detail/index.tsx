import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    headerRight: () => (
      <TouchableOpacity>
        <View paddingHorizontal={16}>
          <Icon
            name="favorite-border"
            size={30}
            color={colors.captionTextColor}
          />
        </View>
      </TouchableOpacity>
    ),
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 16}}>
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

        <View
          style={{
            borderBottomWidth: 1,
            backgroundColor: colors.whiteColor,
            borderColor: colors.borderColor3,
          }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 20,
              gap: 20,
            }}>
            <TouchableOpacity>
              <View flexDirection="row" alignItems="center" gap={6}>
                <Icon name="near-me" size={22} color={colors.primaryColor} />
                <Text medium>Get Directions</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View flexDirection="row" alignItems="center" gap={6}>
                <Icon name="public" size={22} color={colors.primaryColor} />
                <Text medium>Website</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View flexDirection="row" alignItems="center" gap={6}>
                <Icon name="call" size={22} color={colors.primaryColor} />
                <Text medium>Call</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
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
