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
import {adminGetPastDayOffsService} from '@/services/admin.service';
import {setPastDayOffs} from '@/store/admin/dayoffs';
import {colors} from '@/utils';

export default function HistoricalList() {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {fetch, data, loading, refresh, refreshing, error, retry} = useFetch(
    adminGetPastDayOffsService,
  );
  const dayOffData = useSelector(state => state.dayOffs.past);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    dispatch(setPastDayOffs(data));
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
          <ListItem key={index} editable={false} deletable={false} {...item} />
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
