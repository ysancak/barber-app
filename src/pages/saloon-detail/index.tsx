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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BusinessInfo from './components/BusinessInfo';
import ProductList from './components/ProductList';
import Reviews from './components/Reviews';
import ServiceList from './components/ServiceList';
import ShoppingBasket from './components/ShoppingBasket';

import {SkeletonLoading} from '@/components';
import ImageGallery from '@/components/ImageGallery';
import Rating from '@/components/Rating';
import Text from '@/components/Text';
import {useNavigation} from '@/hooks/useNavigation';
import {getSaloonDetailService} from '@/services/saloon.service';
import {colors} from '@/utils';

const SaloonDetail = () => {
  const {t} = useTranslation();
  const {
    params: {id: businessID},
  } = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [saloonDetail, setSaloonDetail] = useState<SaloonDetail>();

  useEffect(() => {
    navigation.setOptions({
      title: saloonDetail?.business.businessName,
      headerRight: HeaderRightComponent,
    });
  }, [saloonDetail]);

  useEffect(() => {
    getSaloonDetail();
  }, [businessID]);

  const getSaloonDetail = async () => {
    setTimeout(async () => {
      setLoading(true);
      try {
        const result = await getSaloonDetailService({id: businessID});
        if (result) {
          setSaloonDetail(result);
        }
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  if (loading) {
    return <SkeletonLoading.SaloonDetail />;
  }

  const HeaderRightComponent = () => (
    <TouchableOpacity>
      <View style={styles.headerRight}>
        <Icon
          name="favorite-border"
          size={30}
          color={colors.captionTextColor}
        />
      </View>
    </TouchableOpacity>
  );

  const HeaderImage = () => (
    <Image
      style={styles.headerImage}
      source={{
        uri: saloonDetail?.business.businessImages[0],
      }}
    />
  );

  const DetailContainer = () => (
    <View style={styles.detailContainer}>
      {saloonDetail?.business.businessImage ? (
        <Image
          style={styles.avatarImage}
          source={{
            uri: saloonDetail?.business.businessImage,
          }}
        />
      ) : (
        <Image
          style={styles.avatarImage}
          source={require('@/assets/images/defaultSaloonAvatarImage.png')}
        />
      )}
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
  );

  const ActionButtons = () => (
    <View style={styles.actionButtonsContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.actionButtonsScrollView}>
        <ActionButton
          icon="near-me"
          text={t('saloonDetail.directionsAction')}
        />
        <ActionButton icon="public" text={t('saloonDetail.websiteAction')} />
        <ActionButton icon="call" text={t('saloonDetail.callAction')} />
      </ScrollView>
    </View>
  );

  const ActionButton = ({icon, text}) => (
    <TouchableOpacity>
      <View style={styles.actionButton}>
        <Icon name={icon} size={22} color={colors.primaryColor} />
        <Text medium>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  const Content = () => (
    <View style={styles.content}>
      {saloonDetail?.services.length > 0 && (
        <ServiceList services={saloonDetail.services} />
      )}
      {saloonDetail?.products.length > 0 && (
        <ProductList products={saloonDetail.products} />
      )}
      <View style={styles.galleryAndReviews}>
        {saloonDetail?.business.businessImages?.length > 0 && (
          <ImageGallery images={saloonDetail?.business.businessImages} />
        )}
        {saloonDetail?.reviews.length > 0 && (
          <Reviews reviews={saloonDetail.reviews} />
        )}
        <BusinessInfo
          coordinate={{
            latitude: saloonDetail?.business.businessLat,
            longitude: saloonDetail?.business.businessLong,
          }}
          address={saloonDetail?.business.businessLocation}
          phone={saloonDetail?.business.businessTel}
          mail={saloonDetail?.business.businessMail}
          website={saloonDetail?.business.businessWebsite}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {saloonDetail?.business.businessImages && <HeaderImage />}
        <DetailContainer />
        <ActionButtons />
        <Content />
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
  headerRight: {
    paddingHorizontal: 16,
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
