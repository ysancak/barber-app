// Reviews/ReviewItem.tsx
import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Rating, Text, View} from '@/components';
import {colors} from '@/utils';

const ReviewItem = () => {
  return (
    <View style={styles.reviewItem}>
      <Text variant="title" fontSize={18}>
        Claire Redfield
      </Text>
      <View style={styles.ratingRow}>
        <Rating score={4.2} />
        <View style={styles.dateRow}>
          <Icon name="calendar-month" size={24} color={colors.primaryColor} />
          <Text fontSize={16}>11.09.2023</Text>
        </View>
      </View>
      <Text>
        I recently visited Chic Coiffeur, and I'm thrilled with the results!...
      </Text>
    </View>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({
  reviewItem: {
    backgroundColor: colors.borderColor2,
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
