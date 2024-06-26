import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

import {SaloonListItem, SkeletonLoading, Text, View} from '@/components';
import {useFetch} from '@/hooks';
import {getPopularSaloonsService} from '@/services/saloon.service';
import {colors} from '@/utils';

const PopularSaloons = () => {
  const {t} = useTranslation();
  const {fetch, loading, data} = useFetch(getPopularSaloonsService);

  useEffect(() => {
    fetch();
  }, []);

  const generateTitle = () => {
    const fullText = t('home.popularSaloons');
    const [firstPart, highlightedPart, lastPart] = fullText.split('*');

    return (
      <View style={styles.centered}>
        <View style={styles.titleContainer}>
          <Text variant="title" style={styles.popText}>
            {firstPart}
          </Text>
          <View style={styles.ularCircle}>
            <Text variant="title" style={styles.ularText}>
              {highlightedPart}
            </Text>
          </View>
        </View>
        <Text variant="title" style={styles.saloonsText}>
          {lastPart}
        </Text>
      </View>
    );
  };

  if (loading || !data) {
    return <SkeletonLoading.PopularSaloons />;
  }

  return (
    <View style={styles.container}>
      {generateTitle()}
      <View style={styles.listContainer}>
        {data?.map((item, index) => (
          <SaloonListItem key={index} {...item} />
        ))}
      </View>
    </View>
  );
};

export default PopularSaloons;

const styles = StyleSheet.create({
  container: {},
  centered: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
    gap: 12,
  },
});
