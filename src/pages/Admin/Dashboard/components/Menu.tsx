import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';

import {Text} from '@/components';
import {useFetch, useNavigation} from '@/hooks';
import {adminBusinessDetailService} from '@/services/admin.service';
import {clearTokens} from '@/store/auth';
import {colors} from '@/utils';
import {hp, wp} from '@/utils/responsive';

export default function Menu() {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const {data, fetch} = useFetch(adminBusinessDetailService);

  useEffect(() => {
    fetch();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  const logoutHandler = () => {
    dispatch(clearTokens());
    navigation.navigate('Tabs');
  };

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
        <Image source={{uri: data?.businessImage}} style={styles.avatar} />
        <Icon
          name={isOpen ? 'expand-less' : 'expand-more'}
          size={28}
          color={colors.textColor}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownItem} onPress={logoutHandler}>
            <Text variant="title" fontSize={16}>
              {t('adminDashboard.headerMenu.logout')}
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
    backgroundColor: colors.borderColor2,
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
