// Reviews/index.tsx
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import ReviewItem from './ReviewItem';

import {Text, View} from '@/components';
import {colors} from '@/utils';

type Props = {
  reviews: Review[];
};

const Reviews: React.FC<Props> = ({reviews}) => {
  const {t} = useTranslation();

  return (
    <View>
      <View style={styles.container}>
        <Icon name={'comment'} size={30} color={colors.primaryColor} />
        <Text variant="title" fontSize={22}>
          {t('review.title')}
        </Text>
      </View>
      <View style={styles.reviewList}>
        {reviews.map((review, index) => (
          <ReviewItem key={`review-${index}`} {...review} />
        ))}
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
    gap: 12,
  },
});
