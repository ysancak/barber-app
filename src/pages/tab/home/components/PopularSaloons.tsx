import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {SaloonListItem, Text, View} from '@/components';
import {getPopularSaloonsService} from '@/services/saloon.service';
import {colors} from '@/utils';

const PopularSaloons = () => {
  const [popularSaloons, setPopularSaloons] = useState<Category[]>([]);

  useEffect(() => {
    getPopularSaloons();
  }, []);

  const getPopularSaloons = async () => {
    try {
      const result = await getPopularSaloonsService();
      setPopularSaloons(result);
    } finally {
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <View style={styles.titleContainer}>
          <Text variant="title" style={styles.popText}>
            Pop
          </Text>
          <View style={styles.ularCircle}>
            <Text variant="title" style={styles.ularText}>
              ular
            </Text>
          </View>
        </View>
        <Text variant="title" style={styles.saloonsText}>
          Saloons
        </Text>
      </View>

      <View style={styles.listContainer}>
        {popularSaloons?.map((item, index) => (
          <SaloonListItem key={index} {...item} />
        ))}
      </View>
    </View>
  );
};

export default PopularSaloons;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
  },
  centered: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popText: {
    fontSize: 24,
  },
  ularCircle: {
    backgroundColor: colors.primaryColor,
    width: 50,
    height: 50,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ularText: {
    fontSize: 24,
    color: colors.whiteColor,
  },
  saloonsText: {
    fontSize: 24,
  },
  listContainer: {
    paddingTop: 20,
  },
});
