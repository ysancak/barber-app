import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Text from './Text';
import View from './View';

import {colors} from '@/utils';

interface RatingProps {
  score: number;
  reviewCount?: number;
  variant?: 'compact' | 'star';
}

const Rating: React.FC<RatingProps> = ({
  score,
  reviewCount,
  variant = 'star',
}) => {
  const {t} = useTranslation();
  const fullStars = Math.floor(score);
  const halfStar = score % 1 !== 0;

  return (
    <View style={styles.container}>
      {variant === 'star' && (
        <View style={styles.ratingContainer}>
          {[...Array(fullStars)].map((_, index) => (
            <Icon key={index} size={22} name="star" style={styles.starIcon} />
          ))}
          {halfStar && (
            <Icon name="star-half" size={22} style={styles.starIcon} />
          )}
          {reviewCount !== undefined && (
            <Text variant="caption" style={styles.reviewText}>
              ({t('rating.comment', {reviewCount})})
            </Text>
          )}
        </View>
      )}
      {variant === 'compact' && (
        <View style={styles.ratingRow}>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{score.toFixed(1)}</Text>
          </View>
          {reviewCount !== undefined && (
            <Text variant="caption" style={styles.reviewText}>
              ({t('rating.comment', {reviewCount})})
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    size: 22,
    color: '#ffa800',
  },
  reviewText: {
    marginLeft: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default Rating;
