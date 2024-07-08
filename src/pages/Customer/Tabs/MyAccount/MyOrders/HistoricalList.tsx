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
import {getHistoricalOrdersService} from '@/services/user.service';
import {setPastOrders} from '@/store/order';
import {colors} from '@/utils';

export default function HistoricalList() {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {fetch, data, loading, refresh, refreshing, error, retry} = useFetch(
    getHistoricalOrdersService,
  );
  const orderData = useSelector(state => state.orders.past);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    dispatch(setPastOrders(data));
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
          <ListItem key={index} {...item} deletable={false} />
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
