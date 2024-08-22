import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import ListItem from './components/ListItem';

import {EmptyPage, ErrorResult, SkeletonLoading} from '@/components';
import {useFetch} from '@/hooks';
import {getUpcomingOrdersService} from '@/services/user.service';
import {setUpcomingOrders} from '@/store/order';
import {colors} from '@/utils';

export default function CurrentList() {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {fetch, data, loading, refresh, refreshing, error, retry} = useFetch(
    getUpcomingOrdersService,
  );
  const orderData = useSelector(state => state.orders.upcoming);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    dispatch(setUpcomingOrders(data));
  }, [data]);

  if (loading && !orderData) {
    return <SkeletonLoading.List />;
  }

  if (error) {
    return <ErrorResult onPress={retry} />;
  }

  if (!orderData?.length) {
    return (
      <EmptyPage
        animation="empty"
        title={t('myOrders.empty.title')}
        description={t('myOrders.empty.description')}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }>
        {orderData.map((item: Order, index: number) => (
          <ListItem key={index} {...item} deletable />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  scrollView: {
    backgroundColor: colors.bgColor,
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
