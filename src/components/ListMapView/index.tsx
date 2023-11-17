import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

import mapStyle from './mapStyle';
import View from '../View';

import {colors} from '@/utils';

type Props = {
  coordinate: Coordinate;
};

const ListMapView: React.FC<Props> = ({coordinate}) => {
  return (
    <MapView
      style={styles.container}
      scrollEnabled={false}
      showsCompass={false}
      customMapStyle={mapStyle}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        ...coordinate,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}>
      <Marker tracksViewChanges={false} coordinate={coordinate}>
        <View style={styles.pin}>
          <Icon name={'storefront'} size={24} color={colors.whiteColor} />
        </View>
      </Marker>
    </MapView>
  );
};

export default ListMapView;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderColor3,
  },
  pin: {
    padding: 8,
    borderRadius: 99,
    backgroundColor: colors.primaryColor,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
});
