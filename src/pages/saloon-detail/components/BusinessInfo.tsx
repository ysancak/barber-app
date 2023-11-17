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
      <View style={{gap: 12}}>
        <ListMapView coordinate={{latitude: 37.79, longitude: -122.42}} />
        <View
          style={{
            backgroundColor: colors.whiteColor,
            padding: 4,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.borderColor3,
          }}>
          <ListItem
            icon="location-on"
            label="Alfred-Escherstrasse 64, 8002, Zürich"
          />
          <ListItem icon="call" label="+44 6633 6526" />
          <ListItem icon="mail" label="info@coiffeur.ch" />
          <ListItem icon="public" label="www.coiffeur.ch" />
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
});
