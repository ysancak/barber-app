import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {ListItem, ListMapView, Text, View} from '@/components';
import {colors} from '@/utils';

const BusinessInfo = () => {
  const {t} = useTranslation();
  return (
    <View>
      <View style={styles.container}>
        <Icon name={'business-center'} size={30} color={colors.primaryColor} />
        <Text variant="title" fontSize={22}>
          {t('businessInfo.title')}
        </Text>
      </View>
      <View style={styles.mapViewContainer}>
        <ListMapView coordinate={{latitude: 37.79, longitude: -122.42}} />
        <View style={styles.listContainer}>
          <ListItem
            icon="location-on"
            label={t('general.address')}
            value="Alfred-Escherstrasse 64, 8002, Zürich"
          />
          <ListItem
            icon="call"
            label={t('general.phone')}
            value="+44 6633 6526"
          />
          <ListItem
            icon="mail"
            label={t('general.email')}
            value="info@coiffeur.ch"
          />
          <ListItem
            icon="public"
            label={t('general.website')}
            value="www.coiffeur.ch"
          />
        </View>

        <View style={styles.listContainer}>
          <ListItem
            label={t('general.paymentMethods')}
            value="Cash & Credit cards"
          />
          <ListItem
            label={t('general.spokenLanguages')}
            value="English and German"
          />
        </View>
      </View>
    </View>
  );
};

export default BusinessInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  mapViewContainer: {
    gap: 12,
  },
  listContainer: {
    backgroundColor: colors.whiteColor,
    padding: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderColor3,
  },
});
