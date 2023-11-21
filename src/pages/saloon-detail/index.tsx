import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Image,
  SafeAreaView,
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
} from '@/components';
import {useNavigation} from '@/hooks/useNavigation';
import {getSaloonDetailService} from '@/services/saloon.service';
import {colors} from '@/utils';
import {
  makePhoneCall,
  openNativeMapWithAddress,
  openUrl,
} from '@/utils/helpers';

const SaloonDetail = () => {
  const {t} = useTranslation();
  const {
    params: {businessID},
  } = useRoute();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saloonDetail, setSaloonDetail] = useState<SaloonDetail>(null);

  useEffect(() => {
    fetchSaloonDetail();
  }, [businessID]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchSaloonDetail();
  };

  useEffect(() => {
    if (saloonDetail) {
      navigation.setOptions({
        title: saloonDetail?.business?.businessName || '',
        headerRight: () => (
          <SaloonFavorite
            initialValue={saloonDetail?.business?.isFavorite}
            businessID={businessID}
          />
        ),
      });
    }
  }, [saloonDetail]);

  const fetchSaloonDetail = async () => {
    try {
      const result = await getSaloonDetailService({id: businessID});
      if (result) {
        setSaloonDetail(result);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  if (loading || !saloonDetail) {
    return <SkeletonLoading.SaloonDetail />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {saloonDetail?.business.businessImages && (
          <Image
            style={styles.headerImage}
            source={{uri: saloonDetail?.business.businessImages[0]}}
          />
        )}

        <View style={styles.detailContainer}>
          <Image
            style={styles.avatarImage}
            source={{
              uri: saloonDetail?.business.businessImage,
            }}
          />
          <View style={styles.detailTextContainer}>
            <Text variant="title" fontSize={20} style={styles.title}>
              {saloonDetail?.business.businessName}
            </Text>
            <Text style={styles.subtitle}>
              {saloonDetail?.business.businessLocation}
            </Text>
            <Rating
              score={saloonDetail?.business.averageReviewPoint}
              reviewCount={saloonDetail?.business.reviewCount}
            />
          </View>
        </View>

        <View style={styles.actionButtonsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.actionButtonsScrollView}>
            {saloonDetail?.business.businessLocation && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  openNativeMapWithAddress(
                    saloonDetail.business.businessLocation,
                    saloonDetail.business.businessName,
                  )
                }>
                <Icon name={'near-me'} size={22} color={colors.primaryColor} />
                <Text medium>{t('saloonDetail.directionsAction')}</Text>
              </TouchableOpacity>
            )}

            {saloonDetail?.business.businessWebsite && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => openUrl(saloonDetail.business.businessWebsite)}>
                <Icon name={'public'} size={22} color={colors.primaryColor} />
                <Text medium>{t('saloonDetail.websiteAction')}</Text>
              </TouchableOpacity>
            )}

            {saloonDetail?.business.businessTel && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() =>
                  makePhoneCall(saloonDetail.business.businessTel)
                }>
                <Icon name={'call'} size={22} color={colors.primaryColor} />
                <Text medium>{t('saloonDetail.callAction')}</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        <View style={styles.content}>
          {saloonDetail?.services.length > 0 && (
            <ServiceList services={saloonDetail.services} />
          )}
          {saloonDetail?.products.length > 0 && (
            <ProductList products={saloonDetail.products} />
          )}
          <View style={styles.galleryAndReviews}>
            {saloonDetail?.business?.businessImages?.length > 0 && (
              <ImageGallery images={saloonDetail?.business.businessImages} />
            )}
            {saloonDetail?.reviews.length > 0 && (
              <Reviews reviews={saloonDetail.reviews} />
            )}
            <BusinessInfo
              coordinate={{
                latitude: saloonDetail?.business?.businessLat,
                longitude: saloonDetail?.business?.businessLong,
              }}
              address={saloonDetail?.business?.businessLocation}
              phone={saloonDetail?.business?.businessTel}
              mail={saloonDetail?.business?.businessMail}
              website={saloonDetail?.business?.businessWebsite}
            />
          </View>
        </View>
      </ScrollView>
      <ShoppingBasket businessID={businessID} />
    </SafeAreaView>
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
