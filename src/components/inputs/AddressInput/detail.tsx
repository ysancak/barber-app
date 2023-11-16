import {useRoute} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {View, Text} from '@/components';
import {useNavigation} from '@/hooks/useNavigation';
import {colors, typography} from '@/utils';
import {MAPS_API_KEY} from '@/utils/constants';

const AddressInputDetail = () => {
  const ref = useRef(null);
  const {i18n} = useTranslation();
  const navigation = useNavigation();
  const {params} = useRoute();
  const currentLanguage = i18n.language;

  useEffect(() => {
    ref.current?.focus();
  }, []);

  navigation.setOptions({
    title: params.title || 'Bir adres seçin',
  });

  return (
    <GooglePlacesAutocomplete
      ref={ref}
      placeholder="Bir bölge veya mahalle ismi ile başlayın..."
      onPress={(data, details = null) => {
        if (details?.geometry.location) {
          navigation.goBack();
          params?.onChange(data.description, {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
        }
      }}
      query={{
        key: MAPS_API_KEY,
        language: currentLanguage ?? 'en',
      }}
      autoFillOnNotFound={true}
      fetchDetails={true}
      enablePoweredByContainer={false}
      listEmptyComponent={<EmptyListComponent />}
      renderHeaderComponent={HeaderComponent}
      styles={componentStyles}
    />
  );
};

const EmptyListComponent = () => (
  <View style={styles.emptyListContainer}>
    <Icon name={'map'} size={60} color={colors.secondaryColor} />
    <Text>Sonuç bulunamadı</Text>
  </View>
);

const HeaderComponent = () => (
  <View style={styles.header}>
    <Text bold>Arama sonuçları</Text>
  </View>
);

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    color: colors.textColor,
    fontSize: typography.contentFontSize,
    fontFamily: 'EncodeSans-Medium',
  },
  predefinedPlacesDescription: {
    color: 'red',
  },
  row: {
    padding: 16,
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  description: {
    fontSize: typography.captionFontSize,
    fontFamily: 'EncodeSans-Regular',
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 60,
    gap: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.whiteColor,
  },
});

const componentStyles = {
  textInput: styles.textInput,
  predefinedPlacesDescription: styles.predefinedPlacesDescription,
  row: styles.row,
  description: styles.description,
};

export default AddressInputDetail;
