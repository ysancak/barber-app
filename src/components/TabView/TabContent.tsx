import React from 'react';
import {StyleSheet} from 'react-native';

import View from '../View';

type Props = {
  title: string;
  children: React.ReactNode;
};

const TabContent = ({children, isActive, title}: Props) => {
  if (!isActive) {
    return null;
  }

  return <View style={styles.container}>{children}</View>;
};

export default TabContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
