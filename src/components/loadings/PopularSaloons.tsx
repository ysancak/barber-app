import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {wp} from '@/utils/responsive';

const PopularSaloonsLoading = () => {
  return (
    <SkeletonPlaceholder
      borderRadius={4}
      highlightColor={'#d5d9de'}
      backgroundColor={'#d5d9de90'}>
      <SkeletonPlaceholder.Item gap={16}>
        <SkeletonPlaceholder.Item
          width={wp(50)}
          height={40}
          borderRadius={12}
        />
        <SkeletonPlaceholder.Item
          width={'100%'}
          height={160}
          borderRadius={12}
        />
        <SkeletonPlaceholder.Item
          width={'100%'}
          height={160}
          borderRadius={12}
        />
        <SkeletonPlaceholder.Item
          width={'100%'}
          height={160}
          borderRadius={12}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default PopularSaloonsLoading;
