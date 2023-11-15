import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Text from './Text';

import {colors} from '@/utils';

type Props = {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  rating: string | number;
  active: boolean;
  onPress: () => void;
};

const MapMarker: React.FC<Props> = ({coordinate, rating, active, onPress}) => {
  const dynamicStyles = {
    pinHead: {
      ...styles.pinHead,
      backgroundColor: active ? colors.primaryColor : colors.whiteColor,
    },
    pinTail: {
      ...styles.pinTail,
      borderTopColor: active ? colors.primaryColor : colors.whiteColor,
    },
  };

  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      <View style={styles.pin}>
        <View style={dynamicStyles.pinHead}>
          <Icon
            name={'star'}
            size={24}
            color={active ? colors.whiteColor : colors.warningColor}
          />
          <Text semibold color={active ? colors.whiteColor : colors.textColor}>
            {rating}
          </Text>
        </View>
        <View style={dynamicStyles.pinTail} />
      </View>
    </Marker>
  );
};

export default MapMarker;

const styles = StyleSheet.create({
  pin: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinHead: {
    width: 75,
    height: 45,
    borderRadius: 99,
    backgroundColor: colors.whiteColor,
    flexDirection: 'row',
    gap: 4,
    paddingRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.secondaryColor,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 4},
    borderColor: colors.borderColor2,
    borderWidth: 1,
  },
  pinTail: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderTopWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.whiteColor,
    transform: [{translateY: -5}],
    shadowColor: colors.secondaryColor,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 4},
  },
});
