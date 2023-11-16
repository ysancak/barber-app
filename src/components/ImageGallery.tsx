import {ImageGallery as Gallery} from '@georstat/react-native-image-gallery';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Text from './Text';
import View from './View';

import {colors} from '@/utils';

type Props = {
  images: string[];
};

const ImageGallery: React.FC<Props> = ({images}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [initialIndex, setInitialIndex] = useState(0);

  useEffect(() => {
    const formattedImages = images.map((url, index) => ({id: index, url}));
    setImageList(formattedImages);
  }, [images]);

  const openGalleryAtIndex = (index: number) => {
    setInitialIndex(index);
    setIsOpen(true);
  };

  const renderHeaderComponent = () => {
    return (
      <SafeAreaView>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setIsOpen(false)}>
          <Icon name="close" size={34} color={colors.whiteColor} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <View flexDirection="row" alignItems="center" gap={6}>
        <Icon name={'photo'} size={30} color={colors.primaryColor} />
        <Text variant="title" fontSize={22}>
          Galeri
        </Text>
      </View>
      <View style={styles.photoContainer}>
        {imageList.map((photo, index) => (
          <TouchableOpacity
            key={photo.id}
            activeOpacity={0.8}
            onPress={() => openGalleryAtIndex(index)}>
            <Image style={styles.image} source={{uri: photo.url}} />
          </TouchableOpacity>
        ))}
      </View>

      <Gallery
        close={() => setIsOpen(false)}
        hideThumbs
        isOpen={isOpen}
        images={imageList}
        initialIndex={initialIndex}
        renderHeaderComponent={renderHeaderComponent}
      />
    </View>
  );
};

export default ImageGallery;

const styles = StyleSheet.create({
  container: {
    gap: 12,
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
  closeButton: {
    alignSelf: 'flex-end',
    padding: 16,
  },
});
