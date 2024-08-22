import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text} from '@/components';
import View from '@/components/View';
import {useNavigation} from '@/hooks';
import {colors} from '@/utils';

const CampaignListItem: React.FC<Campaign> = ({
  businessID,
  businessDetails,
  campaignName,
  campaignEndDate,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SaloonDetail', {businessID})}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: businessDetails?.businessImages[0],
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text variant="title" fontSize={18} style={styles.title}>
          {campaignName}
        </Text>

        <View flexDirection="row" alignItems="center" gap={10}>
          <Text variant="caption" numberOfLines={1} style={{flex: 1}}>
            {businessDetails.businessName}
          </Text>

          {campaignEndDate && (
            <View flexDirection="row" alignItems="center" gap={6}>
              <Icon
                name="calendar-month"
                size={20}
                color={colors.captionTextColor}
              />
              <Text variant="caption">{campaignEndDate}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CampaignListItem;

const styles = StyleSheet.create({
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
    height: 100,
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
