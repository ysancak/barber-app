import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {ListItem, ListMapView, Text, View} from '@/components';
import {colors} from '@/utils';

const BusinessInfo = () => {
  return (
    <View>
      <View style={styles.container}>
        <Icon name={'business-center'} size={30} color={colors.primaryColor} />
        <Text variant="title" fontSize={22}>
          Business Info
        </Text>
      </View>
      <View style={styles.mapViewContainer}>
        <ListMapView coordinate={{latitude: 37.79, longitude: -122.42}} />
        <View style={styles.listContainer}>
          <ListItem
            icon="location-on"
            label="Adres"
            value="Alfred-Escherstrasse 64, 8002, Zürich"
          />
          <ListItem icon="call" label="Telefon" value="+44 6633 6526" />
          <ListItem icon="mail" label="Mail" value="info@coiffeur.ch" />
          <ListItem icon="public" label="Website" value="www.coiffeur.ch" />
        </View>

        <View style={styles.listContainer}>
          <ListItem label="Payment methods" value="Cash & Credit cards" />
          <ListItem label="Spoken languages" value="English and German" />
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
