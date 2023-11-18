import React, {useEffect} from 'react';
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

import ImageGallery from '@/components/ImageGallery';
import Rating from '@/components/Rating';
import Text from '@/components/Text';
import {useNavigation} from '@/hooks/useNavigation';
import {colors} from '@/utils';

const SaloonDetail = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Chic Coiffeour',
      headerRight: HeaderRightComponent,
    });
  }, [navigation]);

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
        uri: 'https://barberscout-8c49e53c42dc.herokuapp.com/assets/img/upload/b-2.webp',
      }}
    />
  );

  const DetailContainer = () => (
    <View style={styles.detailContainer}>
      <Image
        style={styles.avatarImage}
        source={{
          uri: 'https://barberscout-8c49e53c42dc.herokuapp.com/assets/img/upload/b-1.webp',
        }}
      />
      <View style={styles.detailTextContainer}>
        <Text variant="title" fontSize={22} style={styles.title}>
          Chic Coiffeour
        </Text>
        <Text style={styles.subtitle}>Kreis 1,Zürich</Text>
        <Rating score={4.5} reviewCount={23} />
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
      <ServiceList />
      <ProductList />
      <View style={styles.galleryAndReviews}>
        <ImageGallery
          images={[
            'https://barberscout-8c49e53c42dc.herokuapp.com/assets/img/upload/b-2.webp',
          ]}
        />
        <Reviews />
        <BusinessInfo />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <HeaderImage />
        <DetailContainer />
        <ActionButtons />
        <Content />
      </ScrollView>
      <ShoppingBasket />
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
    borderRadius: 99,
  },
  detailTextContainer: {
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
    gap: 20,
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
