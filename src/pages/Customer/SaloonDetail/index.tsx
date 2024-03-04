import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BusinessInfo from './components/BusinessInfo';
import SaloonFavorite from './components/SaloonFavorite';
import ShoppingBasket from './components/ShoppingBasket';

import {
  SkeletonLoading,
  ImageGallery,
  Rating,
  Text,
  Reviews,
  ProductList,
  ServiceList,
  ErrorResult,
} from '@/components';
import {useFetch, useNavigation} from '@/hooks';
import {getSaloonDetailService} from '@/services/saloon.service';
import {colors} from '@/utils';
import {openNativeMapWithAddress} from '@/utils/helpers';

const SaloonDetail = () => {
  const {t} = useTranslation();
  const {
    params: {businessID},
  } = useRoute();
  const navigation = useNavigation();
  const {fetch, loading, data, retry, error, refresh, refreshing} = useFetch(
    getSaloonDetailService,
  );

  useEffect(() => {
    fetch({id: businessID});
  }, [businessID, fetch]);

  useEffect(() => {
    if (data) {
      navigation.setOptions({
        title: data?.business?.businessName || '',
        headerRight: () => (
          <SaloonFavorite
            initialValue={data?.business?.isFavorite}
            businessID={businessID}
          />
        ),
      });
    }
  }, [data]);

  if (!loading && error) {
    <ErrorResult onPress={retry} />;
  }

  if (!refreshing && (loading || !data)) {
    return <SkeletonLoading.SaloonDetail />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }>
        {data?.business.businessImages && (
          <Image
            style={styles.headerImage}
            source={{uri: data?.business.businessImages[0]}}
          />
        )}

        <View style={styles.detailContainer}>
          <Image
            style={styles.avatarImage}
            source={{
              uri: data?.business.businessImage,
            }}
          />
          <View style={styles.detailTextContainer}>
            <Text variant="title" fontSize={20} style={styles.title}>
              {data?.business.businessName}
            </Text>
            <Text style={styles.subtitle}>
              {data?.business.businessLocation}
            </Text>
            <Rating
              score={data?.business.averageReviewPoint}
              reviewCount={data?.business.reviewCount}
            />
          </View>
        </View>

        <View style={styles.actionButtonsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.actionButtonsScrollView}>
            {data?.business.businessLocation && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  openNativeMapWithAddress(
                    data.business.businessLocation,
                    data.business.businessName,
                  )
                }>
                <Icon name={'near-me'} size={22} color={colors.primaryColor} />
                <Text medium>{t('saloonDetail.directionsAction')}</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        <View style={styles.content}>
          {data?.services.length > 0 && (
            <ServiceList services={data.services} />
          )}
          {data?.products.length > 0 && (
            <ProductList products={data.products} />
          )}
          <View style={styles.galleryAndReviews}>
            {data?.business?.businessImages?.length > 0 && (
              <ImageGallery images={data?.business.businessImages} />
            )}
            {data?.reviews.length > 0 && <Reviews reviews={data.reviews} />}
            <BusinessInfo
              coordinate={{
                latitude: data?.business?.businessLat,
                longitude: data?.business?.businessLong,
              }}
              address={data?.business?.businessLocation}
              phone={data?.business?.businessTel}
              mail={data?.business?.businessMail}
              website={data?.business?.businessWebsite}
            />
          </View>
        </View>
      </ScrollView>
      <ShoppingBasket businessID={businessID} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
  headerImage: {
    width: '100%',
    height: 140,
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
    backgroundColor: colors.borderColor3,
    borderRadius: 99,
  },
  detailTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 8,
  },
  actionButtonsContainer: {
    borderBottomWidth: 1,
    backgroundColor: colors.whiteColor,
    borderColor: colors.borderColor3,
  },
  actionButtonsScrollView: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    gap: 35,
    paddingVertical: 20,
  },
  galleryAndReviews: {
    paddingHorizontal: 16,
    gap: 35,
  },
});

export default SaloonDetail;
