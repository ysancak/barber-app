import React from 'react';
import {StyleSheet} from 'react-native';

import Text from './Text';
import View from './View';

import {colors} from '@/utils';

type Props = {
  title: string;
};

const SectionHeader: React.FC<Props> = ({title}) => {
  return (
    <View style={styles.sectionHeader}>
      <Text variant="title" fontSize={16}>
        {title}
      </Text>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.bgColor,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
  },
});
