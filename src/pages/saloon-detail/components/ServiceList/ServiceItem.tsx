import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text, View} from '@/components';
import {colors} from '@/utils';

const ServiceItem: React.FC<Service> = ({
  _id,
  description,
  durationMinutes,
  price,
  currency,
  serviceName,
  serviceType,
}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View flexDirection="row" alignItems="flex-start" gap={16}>
        <View flex gap={8}>
          <Text fontSize={17} semibold>
            {serviceName}
          </Text>
          <View flexDirection="row" gap={8} alignItems="flex-end">
            <Text variant="title" fontSize={20} color={colors.primaryColor}>
              {price} {currency}
            </Text>
            <Text
              variant="title"
              fontSize={16}
              style={styles.oldPrice}
              color={colors.captionTextColor}>
              {price} {currency}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="shopping-cart" size={22} color={colors.whiteColor} />
          <Text variant="caption" color={colors.whiteColor}>
            {t('general.add')}
          </Text>
        </TouchableOpacity>
      </View>
      <Text>{description}</Text>
      <View flexDirection="row" gap={12} alignItems="center">
        <View flexDirection="row" alignItems="center" gap={6}>
          <Icon name="timer" size={22} color={colors.captionTextColor} />
          <Text variant="caption">{durationMinutes}</Text>
        </View>

        <View flexDirection="row" alignItems="center" gap={6}>
          <Icon name="wc" size={22} color={colors.captionTextColor} />
          <Text variant="caption">{serviceType}</Text>
        </View>
      </View>
    </View>
  );
};

export default ServiceItem;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    backgroundColor: colors.whiteColor,
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.borderColor3,
  },
  addButton: {
    padding: 12,
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    borderRadius: 8,
  },
  oldPrice: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'line-through',
  },
});
