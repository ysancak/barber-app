import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import CampaignListItem from './components/CampaignListItem';

import {useFetch} from '@/hooks';
import {getCampaignsService} from '@/services/common.service';
import {colors} from '@/utils';

const Campaigns = () => {
  const {fetch, data} = useFetch(getCampaignsService);

  useEffect(() => {
    fetch();
  }, []);

  console.log(data);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <CampaignListItem />
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
  },
});
