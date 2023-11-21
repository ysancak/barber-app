import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {ListItem, ListMapView, Text, View} from '@/components';
import {colors} from '@/utils';

type Props = {
  coordinate?: Coordinate;
  address?: string;
  phone?: string;
  mail?: string;
  website?: string;
};

const BusinessInfo: React.FC<Props> = ({
  coordinate,
  address,
  phone,
  mail,
  website,
}) => {
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
        {coordinate && <ListMapView coordinate={coordinate} />}
        <View style={styles.listContainer}>
          {address && (
            <ListItem
              icon="location-on"
              label={t('general.address')}
              value={address}
            />
          )}
          {phone && (
            <ListItem icon="call" label={t('general.phone')} value={phone} />
          )}
          {mail && (
            <ListItem icon="mail" label={t('general.email')} value={mail} />
          )}
          {website && (
            <ListItem
              icon="public"
              label={t('general.website')}
              value={website}
            />
          )}
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
