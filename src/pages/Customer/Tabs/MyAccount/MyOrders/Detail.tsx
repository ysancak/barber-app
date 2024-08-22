import {RouteProp, useRoute} from '@react-navigation/native';
import moment from 'moment';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {HeaderRightButton, SectionHeader, Text, View} from '@/components';
import {showAlert} from '@/components/Alert';
import {useNavigation} from '@/hooks';
import BusinessInfo from '@/pages/Customer/SaloonDetail/components/BusinessInfo';
import {deleteOrderService} from '@/services/user.service';
import {deleteOrder} from '@/store/order';
import {colors} from '@/utils';
import {showSuccessToast} from '@/utils/toast';

type Props = {
  MyOrderDetail: {
    order: Order;
    deletable: boolean;
  };
};

export default function MyOrderDetail() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    params: {order, deletable},
  } = useRoute<RouteProp<Props, 'MyOrderDetail'>>();
  const products: Product[] = order.orderItems.filter(
    (item): item is Product => 'productName' in item,
  );
  const services: Service[] = order.orderItems.filter(
    (item): item is Service => 'serviceName' in item,
  );

  navigation.setOptions({
    headerRight() {
      if (!deletable) {
        return null;
      }
      return (
        <HeaderRightButton
          title={t('myOrders.orderCancelButtonText')}
          loading={false}
          disabled={false}
          onPress={onDelete}
        />
      );
    },
  });

  const renderProducts = useMemo(() => {
    return products.length > 0 ? (
      <>
        <SectionHeader title={t('myOrders.section.products')} />
        {products.map(product => (
          <View key={`product-${product._id}`} style={styles.productItem}>
            <View style={styles.productQuantity}>
              <Text color={colors.whiteColor}>{''}</Text>
            </View>
            <Text>{product.productName}</Text>
          </View>
        ))}
      </>
    ) : null;
  }, [products]);

  const renderServices = useMemo(() => {
    return services.length > 0 ? (
      <>
        <SectionHeader title={t('myOrders.section.services')} />
        {services.map(service => (
          <View key={`service-${service._id}`} style={styles.serviceItem}>
            <Text>{service.serviceName}</Text>
            <Text variant="caption">
              {t('general.byMinute', {minute: service.durationMinutes})}
            </Text>
          </View>
        ))}
      </>
    ) : null;
  }, [services, t]);

  const renderServiceDate = useMemo(
    () => (
      <View style={styles.serviceDateContainer}>
        <Text textAlign="center" fontSize={40} bold>
          {moment(order.startDate).format('HH:mm')}
        </Text>
        <Text textAlign="center" fontSize={20} bold>
          {`${moment(order.startDate).format('LL')} - ${moment(
            order.startDate,
          ).format('dddd')}`}
        </Text>
        <Text textAlign="center">{t('orderResult.serviceDateInfo')}</Text>
      </View>
    ),
    [order, t],
  );

  const deleteHandler = () => {
    try {
      dispatch(deleteOrder(order._id));
      deleteOrderService(order._id);
      navigation.goBack();
      showSuccessToast(t('myOrders.toast.orderCancelSuccess'));
    } catch (error) {}
  };

  const onDelete = () => {
    showAlert({
      title: t('myOrders.alert.orderCancel.title'),
      content: t('myOrders.alert.orderCancel.description'),
      buttons: [
        {
          type: 'default',
          text: t('myOrders.alert.orderCancel.buttons.delete'),
          onPress: () => deleteHandler(),
        },
        {
          type: 'secondary',
          text: t('alert.delete.actions.cancel'),
        },
      ],
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {renderServiceDate}
      {renderServices}
      {renderProducts}

      <SectionHeader title={t('myOrders.section.businessInfo')} />
      <View style={styles.businessInfoContainer}>
        <View style={styles.businessInfoRow}>
          <Image
            source={{uri: order.business.businessImage}}
            style={styles.businessImage}
          />
          <Text variant="title" fontSize={16}>
            {order.business.businessName}
          </Text>
        </View>
      </View>
      <View style={styles.businessContainer}>
        <BusinessInfo
          address={order.business.businessLocation}
          coordinate={{
            latitude: order.business.businessLat,
            longitude: order.business.businessLong,
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  businessContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  serviceDateContainer: {
    padding: 30,
    gap: 12,
    alignItems: 'center',
    backgroundColor: '#00000010',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  productItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  productQuantity: {
    padding: 6,
    borderRadius: 4,
    backgroundColor: colors.secondaryColor,
  },
  serviceItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
  },
  businessInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  businessImage: {
    width: 35,
    height: 35,
    borderRadius: 99,
    borderColor: colors.borderColor,
    borderWidth: 1,
  },
  businessInfoContainer: {
    padding: 16,
  },
});
