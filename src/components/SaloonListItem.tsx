import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Text from './Text';

import {colors} from '@/utils';

const SaloonListItem: React.FC<Saloon> = ({
  businessImage,
  businessName,
  businessLocation,
}) => {
  return (
    <View style={styles.container}>
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
        <View style={styles.ratingRow}>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>4.0</Text>
          </View>
          <Text variant="caption">(1 Bewertungen)</Text>
        </View>
      </View>
    </View>
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
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingBadge: {
    backgroundColor: 'orange',
    alignSelf: 'baseline',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    color: colors.whiteColor,
  },
});
