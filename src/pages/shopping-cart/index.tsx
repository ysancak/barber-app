import React, {useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Button, ListItem, Text, View} from '@/components';
import {useNavigation} from '@/hooks/useNavigation';
import {colors} from '@/utils';

const ShoppingCart = () => {
  const businessID = 'businessOrnek1';
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRightComponent,
    });
  }, [navigation]);

  const HeaderRightComponent = () => (
    <TouchableOpacity>
      <View style={styles.headerRight}>
        <Icon name="delete-outline" size={26} color={colors.primaryColor} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.sectionHeader}>
          <Text variant="title" fontSize={16}>
            Servisler
          </Text>
        </View>

        <View style={styles.serviceItem}>
          <View style={styles.serviceItemTextContainer}>
            <Text>LPG Targeted Treatment</Text>
            <Text semibold fontSize={18} color={colors.primaryColor}>
              164.34 TL
            </Text>
            <View style={styles.iconTextContainer}>
              <Icon name="timer" size={22} color={colors.captionTextColor} />
              <Text variant="caption">24 min</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="delete-outline" size={26} color={colors.primaryColor} />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text variant="title" fontSize={16}>
            Ürünler
          </Text>
        </View>

        <View style={styles.productItem}>
          <View style={styles.productItemInnerContainer}>
            <Image
              source={{
                uri: 'https://barberscout-8c49e53c42dc.herokuapp.com/assets/images/business/productImage-1699892098219-642483261.webp',
              }}
              style={styles.productImage}
            />
            <View style={styles.productDescription}>
              <Text>LPG Targeted Treatment and must be</Text>
              <Text semibold fontSize={18} color={colors.primaryColor}>
                164.34 TL
              </Text>
            </View>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.decreaseButton}>
              <Icon name="remove" size={22} color={colors.whiteColor} />
            </TouchableOpacity>

            <Text medium fontSize={18} color={colors.whiteColor}>
              1
            </Text>

            <TouchableOpacity style={styles.increaseButton}>
              <Icon name="add" size={22} color={colors.whiteColor} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text variant="title" fontSize={16}>
            Fiyat
          </Text>
        </View>
        <ListItem icon="credit-card" label="Total price" value="1124.55" />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button label="Devam et" />
      </View>
    </SafeAreaView>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.bgColor,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
  },
  serviceItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.whiteColor,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
    gap: 12,
  },
  serviceItemTextContainer: {
    flex: 1,
    gap: 8,
  },
  iconTextContainer: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  productItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: colors.whiteColor,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
    gap: 16,
  },
  productItemInnerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 12,
  },
  productImage: {
    width: 42,
    height: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderColor3,
  },
  productDescription: {
    gap: 8,
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primaryColor,
    borderRadius: 8,
    padding: 8,
    gap: 6,
  },
  decreaseButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  increaseButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  headerRight: {
    paddingHorizontal: 16,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
