import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import HeaderRight from './components/HeaderRight';
import ListItem from './components/ListItem';

import {EmptyPage, ErrorResult, SkeletonLoading} from '@/components';
import {useFetch, useNavigation} from '@/hooks';
import {adminGetWorkersService} from '@/services/admin.service';
import {setWorkers} from '@/store/admin/workers';
import {colors} from '@/utils';

export default function Workers() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {fetch, data, loading, refresh, refreshing, error, retry} = useFetch(
    adminGetWorkersService,
  );
  const workersData = useSelector(state => state.workers.workers);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    dispatch(setWorkers(data));
  }, [data]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [navigation]);

  if (loading && !workersData) {
    return <SkeletonLoading.List />;
  }

  if (error) {
    return <ErrorResult onPress={retry} />;
  }

  if (!workersData?.length) {
    return (
      <EmptyPage animation="empty" title={'Boş'} description={'Çalışan yok'} />
    );
  }

  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }>
      {workersData.map((item: Worker, index: number) => (
        <ListItem key={index} {...item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.bgColor,
  },
});
