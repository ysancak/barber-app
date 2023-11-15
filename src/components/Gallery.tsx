import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import GalleryView from 'react-native-awesome-gallery';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Text from './Text';
import View from './View';

import {colors} from '@/utils';

const Gallery = () => {
  const [active, setActive] = useState<string | undefined>();
  const photos = [
    'https://barberscout-8c49e53c42dc.herokuapp.com/assets/img/upload/b-2.webp',
    'https://barberscout-8c49e53c42dc.herokuapp.com/assets/img/upload/b-3.webp',
  ];

  return (
    <View>
      <View style={styles.container}>
        <Icon name={'photo'} size={30} color={colors.primaryColor} />
        <Text variant="title" fontSize={22}>
          Galeri
        </Text>
      </View>
      <View style={styles.photoContainer}>
        {photos.map(photo => (
          <TouchableOpacity
            key={photo}
            activeOpacity={0.8}
            onPress={() => setActive(photo)}>
            <Image style={styles.image} key={photo} source={{uri: photo}} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  photoContainer: {
    gap: 12,
  },
});
