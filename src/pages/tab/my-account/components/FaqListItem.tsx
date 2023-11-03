import React from 'react';
import {StyleSheet} from 'react-native';

import {Text, View} from '@/components';
import {colors} from '@/utils';

const FaqListItem: React.FC<FaqResponse> = ({question, answer}) => {
  return (
    <View
      style={styles.container}
      paddingHorizontal={16}
      paddingVertical={16}
      gap={8}>
      <Text variant="title" fontSize={18}>
        {question}
      </Text>
      <Text>{answer}</Text>
    </View>
  );
};

export default FaqListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor2,
    paddingHorizontal: 12,
  },
});
