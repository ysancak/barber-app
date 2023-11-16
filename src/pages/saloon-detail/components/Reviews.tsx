import React from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Rating, Text, View} from '@/components';
import {colors} from '@/utils';

const Reviews = () => {
  const renderReview = () => {
    return (
      <View>
        <View
          style={{
            backgroundColor: colors.borderColor2,
            padding: 16,
            borderRadius: 12,
            gap: 16,
          }}>
          <Text variant="title" fontSize={18}>
            Claire Redfield
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
            <Rating score={4.2} />
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
              <Icon
                name="calendar-month"
                size={24}
                color={colors.primaryColor}
              />
              <Text fontSize={16}>11.09.2023</Text>
            </View>
          </View>
          <Text>
            I recently visited Chic Coiffeur, and I'm thrilled with the results!
            The hairstylists here are true artists. They transformed my hair
            into a masterpiece. The salon's ambiance is so relaxing, and the
            staff is incredibly friendly. I can't recommend this place enough.
            I'll definitely be coming back for all my future hair needs!
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.container}>
        <Icon name={'comment'} size={30} color={colors.primaryColor} />
        <Text variant="title" fontSize={22}>
          Neueste Bewertungen
        </Text>
      </View>
      <View style={{gap: 16}}>
        {renderReview()}
        {renderReview()}
      </View>
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
});
