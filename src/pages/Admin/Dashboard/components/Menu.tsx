import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text} from '@/components';
import {colors} from '@/utils';
import {hp, wp} from '@/utils/responsive';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  return (
    <View style={styles.menuContainer}>
      {isOpen && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.overlay}
          onPress={handleClose}
        />
      )}
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.menuButton}
        onPress={toggleMenu}>
        <View style={styles.avatar} />
        <Icon
          name={isOpen ? 'expand-less' : 'expand-more'}
          size={28}
          color={colors.textColor}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text variant="title" fontSize={16}>
              Çıkış yap
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    flex: 1,
    top: -60,
    right: -16,
    left: -wp(100),
    bottom: -hp(100),
  },
  menuContainer: {
    flexDirection: 'column',
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryColor,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: 50,
    backgroundColor: colors.whiteColor,
    zIndex: 99,
    width: 200,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderColor3,
    shadowOffset: {width: 1, height: 10},
    shadowColor: colors.secondaryColor,
    shadowRadius: 8,
    shadowOpacity: 0.05,
  },
  dropdownItem: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
});
