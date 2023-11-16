// Reviews/index.tsx
import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ReviewItem from './ReviewItem';

import {Text, View} from '@/components';
import {colors} from '@/utils';

const Reviews = () => {
  return (
    <View>
      <View style={styles.container}>
        <Icon name={'comment'} size={30} color={colors.primaryColor} />
        <Text variant="title" fontSize={22}>
          Neueste Bewertungen
        </Text>
      </View>
      <View style={styles.reviewList}>
        <ReviewItem />
        <ReviewItem />
      </View>
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  reviewList: {
    gap: 16,
  },
});
