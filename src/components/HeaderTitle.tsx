import React from 'react';
import {StyleSheet} from 'react-native';

import Text from './Text';

import {wp} from '@/utils/responsive';

interface Props {
  title: string;
}

const HeaderTitle: React.FC<Props> = ({title}) => {
  return (
    <Text
      variant="content"
      numberOfLines={1}
      semibold
      fontSize={17}
      style={styles.text}>
      {title}
    </Text>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  text: {
    maxWidth: wp(40),
    paddingHorizontal: 8,
  },
});
