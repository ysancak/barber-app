import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {RefreshControl} from 'react-native-gesture-handler';

import CampaignListItem from './components/CampaignListItem';

import {EmptyPage, ErrorResult, SkeletonLoading} from '@/components';
import {useFetch} from '@/hooks';
import {getCampaignsService} from '@/services/common.service';
import {colors} from '@/utils';

const Campaigns = () => {
  const {t} = useTranslation();
  const {fetch, refresh, retry, refreshing, loading, error, data} =
    useFetch(getCampaignsService);

  useEffect(() => {
    fetch();
  }, []);

  if (!loading && error) {
    return <ErrorResult onPress={retry} />;
  }

  if (!loading && !error && data?.length <= 0) {
    return (
      <EmptyPage
        icon="campaign"
        title={t('campaigns.empty.title')}
        description={t('campaigns.empty.description')}
      />
    );
  }

  if (loading && !refreshing) {
    return <SkeletonLoading.List />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }>
      {data?.map(campaign => (
        <CampaignListItem key={campaign._id} {...campaign} />
      ))}
    </ScrollView>
  );
};

export default Campaigns;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.bgColor,
    gap: 12,
  },
});
