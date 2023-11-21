import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Rating, Text, View} from '@/components';
import {colors} from '@/utils';

const ReviewItem: React.FC<Review> = ({
  reviewOwner,
  reviewPoint,
  reviewDate,
  reviewDetails,
}) => {
  return (
    <View style={styles.reviewItem}>
      <Text variant="title" fontSize={18}>
        {reviewOwner}
      </Text>
      <View style={styles.ratingRow}>
        <Rating score={reviewPoint} />
        <View style={styles.dateRow}>
          <Icon name="calendar-month" size={24} color={colors.primaryColor} />
          <Text fontSize={16}>{reviewDate}</Text>
        </View>
      </View>
      <Text>{reviewDetails}</Text>
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
