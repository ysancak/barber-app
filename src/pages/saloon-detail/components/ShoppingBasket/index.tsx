import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text, View} from '@/components';
import {colors} from '@/utils';

const ShoppingBasket = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.infoWrapper}>
          <View style={styles.infoSection}>
            <View style={styles.iconTextWrapper}>
              <Icon
                name={'content-cut'}
                size={22}
                color={colors.primaryColor}
              />
              <Text>23 servis</Text>
            </View>
            <View style={styles.iconTextWrapper}>
              <Icon name={'storefront'} size={22} color={colors.primaryColor} />
              <Text>99 ürün</Text>
            </View>
          </View>
          <Text variant="title" fontSize={22}>
            164.34
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button}>
            <Text medium>Sepete git</Text>
            <Icon name={'chevron-right'} size={30} color={colors.textColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ShoppingBasket;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    marginHorizontal: 0,
    backgroundColor: colors.whiteColor,
    borderColor: colors.borderColor3,
    borderRadius: 0,
    borderTopWidth: 1,
    alignItems: 'center',
    alignSelf: 'center',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowColor: colors.secondaryColor,
    shadowRadius: 20,
    paddingLeft: 22,
    paddingRight: 16,
    paddingVertical: 20,
  },
  contentWrapper: {
    flexDirection: 'row',
    gap: 20,
    paddingBottom: 26,
  },
  infoWrapper: {
    gap: 16,
    flex: 1,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgColor,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 8,
    borderRadius: 12,
  },
});
