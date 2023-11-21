import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {colors} from '@/utils';

const Favorites = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
