import React from 'react';
import {Image, StyleSheet} from 'react-native';

import {Text} from '@/components';
import View from '@/components/View';
import {colors} from '@/utils';

const CampaignListItem = () => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1200',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text variant="title" fontSize={18} style={styles.title}>
          Haftasonu indirimi
        </Text>
        <Text style={styles.description}>
          16 Ekim - 18 Ekim tarihleri arasında "Saç kesimi" kategorisinde %10
          indirim fırsatı
        </Text>
      </View>
    </View>
  );
};

export default CampaignListItem;

const styles = StyleSheet.create({
  itemContainer: {
    paddingBottom: 16,
  },
  imageContainer: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.borderColor,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.borderColor3,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  textContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.whiteColor,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
  },
  title: {
    marginBottom: 12,
  },
  description: {},
});
