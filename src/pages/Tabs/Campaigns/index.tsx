import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {RefreshControl} from 'react-native-gesture-handler';

import CampaignListItem from './components/CampaignListItem';

import {EmptyPage, ErrorResult, SkeletonLoading} from '@/components';
import {useFetch} from '@/hooks';
import {getCampaignsService} from '@/services/common.service';
import {colors} from '@/utils';

const Campaigns = () => {
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
        title="Kampanya yok"
        description="Favoriye eklenmiş bir salon bulunmuyor"
      />
    );
  }

  if (loading) {
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
