import React, {useEffect, useMemo, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SwiperFlatList} from 'react-native-swiper-flatlist';

import {Text, View} from '@/components';
import {useFetch} from '@/hooks';
import {homeSlidesService} from '@/services/common.service';
import {wp} from '@/utils/responsive';

const Slider = () => {
  const {data, fetch} = useFetch(homeSlidesService);

  useEffect(() => {
    fetch();
  }, []);

  if (data?.length > 0) {
    return (
      <View style={styles.container}>
        <SwiperFlatList
          autoplay
          autoplayDelay={5}
          autoplayLoop
          index={0}
          showPagination
          paginationStyleItem={{width: 8, height: 8}}>
          {data?.map(({_id, image_path, slideBig, slideSmall}) => (
            <View key={_id} style={styles.container}>
              <Image
                source={{
                  uri: image_path,
                }}
                resizeMode="cover"
                style={styles.image}
              />
              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
              />
              <View style={styles.text}>
                <Text variant="title" fontSize={20} color="white">
                  {slideBig}
                </Text>
                <Text variant="content" fontSize={16} color="white">
                  {slideSmall}
                </Text>
              </View>
            </View>
          ))}
        </SwiperFlatList>
      </View>
    );
  }

  return null;
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: wp(100),
    height: 200,
  },
  image: {
    width: wp(100),
    height: 200,
    position: 'absolute',
    zIndex: 0,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    zIndex: 1,
  },
  text: {
    position: 'absolute',
    zIndex: 2,
    bottom: 40,
    left: 16,
    right: 16,
    color: 'white',
    gap: 4,
    fontSize: 20,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});
