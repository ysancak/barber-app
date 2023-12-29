import React from 'react';
import {ScrollView, SafeAreaView, StyleSheet, Image} from 'react-native';

import PopularSaloons from './components/PopularSaloons';
import SearchSaloons from './components/Search';
import Slider from './components/Slider';

import {View} from '@/components';
import {colors} from '@/utils';

function Home(): JSX.Element {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <SafeAreaView style={styles.safeArea}>
        <View
          style={{
            borderBottomWidth: 1,
            paddingBottom: 10,
            borderColor: colors.borderColor,
          }}>
          <Image
            source={require('@/assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <ScrollView>
          <View style={{paddingBottom: 20}}>
            <Slider />
          </View>
          <View style={styles.container}>
            <SearchSaloons />
            <PopularSaloons />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 36,
  },
  logo: {
    width: '100%',
    height: 50,
    marginTop: 16,
    marginBottom: 12,
  },
});
