import {clearTokens} from '@/store/auth';
import {colors} from '@/utils';
import React from 'react';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';

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
