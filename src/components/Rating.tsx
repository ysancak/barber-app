import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Text from './Text';
import View from './View';

import {colors} from '@/utils';

interface RatingProps {
  score?: number;
  reviewCount?: number;
  variant?: 'compact' | 'star';
}

const Rating: React.FC<RatingProps> = ({
  score,
  reviewCount,
  variant = 'star',
}) => {
  const {t} = useTranslation();

  console.log(score, reviewCount);

  if (
    (score === undefined || score <= 0) &&
    (reviewCount === undefined || reviewCount <= 0)
  ) {
    return (
      <View style={styles.container}>
        <Text variant="caption">{t('rating.noReviews')}</Text>
      </View>
    );
  }

  const badgeColor = score => {
    if (score < 2) {
      return colors.ratingColor.low;
    }
    if (score < 3) {
      return colors.ratingColor.mediumLow;
    }
    if (score < 4) {
      return colors.ratingColor.medium;
    }
    if (score < 4.5) {
      return colors.ratingColor.mediumHigh;
    }
    return colors.ratingColor.high;
  };

  return (
    <View style={styles.container}>
      {variant === 'star' && (
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, index) => (
            <Icon
              key={index}
              size={22}
              name={
                index < score
                  ? index < Math.floor(score)
                    ? 'star'
                    : 'star-half'
                  : 'star-border'
              }
              style={styles.starIcon}
            />
          ))}
          {reviewCount !== undefined && (
            <Text variant="caption" style={styles.reviewText}>
              ({t('rating.comment', {reviewCount})})
            </Text>
          )}
        </View>
      )}
      {variant === 'compact' && (
        <View style={styles.ratingRow}>
          <View
            style={[styles.ratingBadge, {backgroundColor: badgeColor(score)}]}>
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
