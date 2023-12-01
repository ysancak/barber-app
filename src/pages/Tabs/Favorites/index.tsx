import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';

import {
  EmptyPage,
  ErrorResult,
  SaloonListItem,
  SkeletonLoading,
} from '@/components';
import {useNavigation, useFetch, useAuth} from '@/hooks';
import {getFavoriteSaloonsService} from '@/services/saloon.service';
import {colors} from '@/utils';

const Favorites = () => {
  const {t} = useTranslation();
  const isAuthenticated = useAuth();
  const navigation = useNavigation();

  const {fetch, refresh, retry, refreshing, loading, error, data} = useFetch(
    getFavoriteSaloonsService,
  );

  useEffect(() => {
    fetch();
  }, []);

  if (!isAuthenticated) {
    return (
      <EmptyPage
        icon="favorite"
        title={t('favorites.login.title')}
        description={t('favorites.login.description')}
        buttons={[
          {
            text: t('favorites.login.action'),
            type: 'default',
            onPress: () => navigation.navigate('Login'),
          },
        ]}
      />
    );
  }

  if (!loading && error) {
    return <ErrorResult onPress={retry} />;
  }

  if (!loading && !error && data?.length <= 0) {
    return (
      <EmptyPage
        icon="favorite"
        title={t('favorites.empty.title')}
        description={t('favorites.empty.description')}
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
      {data?.map(saloon => (
        <SaloonListItem key={saloon._id} {...saloon} />
      ))}
    </ScrollView>
  );
};

export default Favorites;

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
