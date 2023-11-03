import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import CampaignListItem from './components/CampaignListItem';

import {colors} from '@/utils';

const Campaigns = () => {
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
