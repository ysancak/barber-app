import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';

import {colors} from '@/utils';

function EditProfile(): JSX.Element {
  return (
    <ScrollView style={styles.container}>
      <Text>Detail</Text>
    </ScrollView>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
});
