import {t} from 'i18next';
import {Linking, Platform} from 'react-native';

export const makePhoneCall = async (number: string) => {
  const replacedNumber = number?.toString().replaceAll(' ', '');
  const url = `tel:${replacedNumber}`;
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  } catch (error) {
    console.error(error);
  }
};

export const openNativeMapWithCoordinate = async (
  latitude: number,
  longitude: number,
  label = t('nativeMapDefaultLabel'),
) => {
  const scheme = Platform.select({
    ios: 'maps:0,0?q=',
    android: 'geo:0,0?q=',
  });
  const location = `${latitude},${longitude}`;
  const encodedLabel = encodeURIComponent(label);
  const url = Platform.select({
    ios: `${scheme}${encodedLabel}@${location}`,
    android: `${scheme}${location}(${encodedLabel})`,
  });

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  } catch (error) {
    console.error(error);
  }
};

export const openNativeMapWithAddress = async (
  address: string,
  label = t('nativeMapDefaultLabel'),
) => {
  const scheme = Platform.select({
    ios: 'maps:0,0?q=',
    android: 'geo:0,0?q=',
  });
  const encodedAddress = encodeURIComponent(address);
  const encodedLabel = encodeURIComponent(label);
  const url = Platform.select({
    ios: `${scheme}${encodedLabel}@${encodedAddress}`,
    android: `${scheme}${encodedAddress}(${encodedLabel})`,
  });

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  } catch (error) {
    console.error(error);
  }
};

export const openUrl = url => {
  let validUrl = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    validUrl = `http://${url}`;
  }
  Linking.openURL(validUrl).catch(err =>
    console.error('Failed to open URL:', err),
  );
};
