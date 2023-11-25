import React from 'react';
import {StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import View from '../View';

import {colors} from '@/utils';

const CalendarLoading = () => {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder
        borderRadius={4}
        highlightColor={'#d5d9de'}
        backgroundColor={'#d5d9de90'}>
        <SkeletonPlaceholder.Item
          marginTop={16}
          borderRadius={12}
          marginHorizontal={16}
          height={50}
        />

        <View style={styles.actionButtonsContainer}>
          <SkeletonPlaceholder.Item width={60} height={33} borderRadius={99} />
          <SkeletonPlaceholder.Item flex={1} height={33} borderRadius={99} />
          <SkeletonPlaceholder.Item width={60} height={33} borderRadius={99} />
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
            height={40}
            borderRadius={12}
            marginHorizontal={16}
          />
          <SkeletonPlaceholder.Item
            height={40}
            borderRadius={12}
            marginHorizontal={16}
          />
          <SkeletonPlaceholder.Item
            height={40}
            borderRadius={12}
            marginHorizontal={16}
          />
          <SkeletonPlaceholder.Item
            height={40}
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
            height={40}
            borderRadius={12}
            marginHorizontal={16}
          />
          <SkeletonPlaceholder.Item
            height={40}
            borderRadius={12}
            marginHorizontal={16}
          />
          <SkeletonPlaceholder.Item
            height={40}
            borderRadius={12}
            marginHorizontal={16}
          />
          <SkeletonPlaceholder.Item
            height={40}
            borderRadius={12}
            marginHorizontal={16}
          />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default CalendarLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
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
