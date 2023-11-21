import React from 'react';
import {StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import View from '../View';

import {colors} from '@/utils';

const SaloonDetailLoading = () => {
  return (
    <SkeletonPlaceholder
      borderRadius={4}
      highlightColor={'#d5d9de'}
      backgroundColor={'#d5d9de90'}>
      <View>
        <SkeletonPlaceholder.Item width={'100%'} height={140} />

        <View style={styles.detailContainer}>
          <SkeletonPlaceholder.Item width={86} height={86} borderRadius={99} />
          <View style={styles.detailTextContainer}>
            <SkeletonPlaceholder.Item
              width={160}
              height={30}
              borderRadius={12}
            />
            <SkeletonPlaceholder.Item
              width={195}
              height={16}
              borderRadius={12}
            />
            <SkeletonPlaceholder.Item
              width={60}
              height={16}
              borderRadius={12}
            />
          </View>
        </View>
        <View style={styles.actionButtonsContainer}>
          <SkeletonPlaceholder.Item width={100} height={33} borderRadius={99} />
          <SkeletonPlaceholder.Item width={100} height={33} borderRadius={99} />
          <SkeletonPlaceholder.Item width={100} height={33} borderRadius={99} />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.row}>
            <SkeletonPlaceholder.Item
              width={100}
              height={33}
              borderRadius={99}
            />
          </View>
          <SkeletonPlaceholder.Item
            height={160}
            borderRadius={12}
            marginHorizontal={16}
          />
          <SkeletonPlaceholder.Item
            height={160}
            borderRadius={12}
            marginHorizontal={16}
          />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.row}>
            <SkeletonPlaceholder.Item
              width={100}
              height={33}
              borderRadius={99}
            />
          </View>
          <SkeletonPlaceholder.Item
            height={160}
            borderRadius={12}
            marginHorizontal={16}
          />
          <SkeletonPlaceholder.Item
            height={160}
            borderRadius={12}
            marginHorizontal={16}
          />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default SaloonDetailLoading;

const styles = StyleSheet.create({
  detailContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: colors.infoColor,
    borderBottomWidth: 1,
    borderColor: colors.borderColor2,
  },
  detailTextContainer: {
    gap: 8,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    paddingVertical: 14,
    gap: 16,
    backgroundColor: colors.whiteColor,
    borderColor: colors.borderColor3,
  },
  contentContainer: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
    marginTop: 16,
  },
});
