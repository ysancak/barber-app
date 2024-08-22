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
import {adminGetUpcomingDayOffsService} from '@/services/admin.service';
import {setUpcomingDayOffs} from '@/store/admin/dayoffs';
import {colors} from '@/utils';

export default function CurrentList() {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {fetch, data, loading, refresh, refreshing, error, retry} = useFetch(
    adminGetUpcomingDayOffsService,
  );
  const dayOffData = useSelector(state => state.dayOffs.upcoming);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    dispatch(setUpcomingDayOffs(data));
  }, [data]);

  if (loading && !dayOffData) {
    return <SkeletonLoading.List />;
  }

  if (error) {
    return <ErrorResult onPress={retry} />;
  }

  if (!dayOffData?.length) {
    return (
      <EmptyPage
        animation="empty"
        title={t('adminDayOffs.empty.title')}
        description={t('adminDayOffs.empty.description')}
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
        {dayOffData.map((item: WorkerDayOff, index: number) => (
          <ListItem key={index} {...item} />
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
