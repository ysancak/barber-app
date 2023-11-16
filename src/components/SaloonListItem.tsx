import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Rating from './Rating';
import Text from './Text';

import {useNavigation} from '@/hooks/useNavigation';
import {colors} from '@/utils';

const SaloonListItem: React.FC<Saloon> = ({
  _id,
  businessImage,
  businessName,
  businessLocation,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => navigation.navigate('SaloonDetail', {id: _id})}>
      <View style={styles.imageContainer}>
        <Image source={{uri: businessImage}} style={styles.businessImage} />
      </View>
      <View style={styles.detailsContainer}>
        <Text variant="title" style={styles.businessName}>
          {businessName}
        </Text>
        <View style={styles.locationRow}>
          <Icon name={'location-on'} size={22} color={colors.borderColor} />
          <Text>{businessLocation}</Text>
        </View>
        <Rating score={4.3} variant="compact" reviewCount={24} />
      </View>
    </TouchableOpacity>
  );
};

export default SaloonListItem;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  imageContainer: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.borderColor,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.borderColor2,
  },
  businessImage: {
    width: '100%',
    height: 120,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  detailsContainer: {
    gap: 12,
    padding: 16,
    backgroundColor: colors.whiteColor,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  businessName: {
    fontSize: 18,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
