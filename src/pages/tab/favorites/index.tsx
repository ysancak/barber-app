import React, {useEffect} from 'react';
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
        title="Giriş yap"
        description="Salonları favoriye eklemek
        için veya favorileri görüntülemek için giriş yapmalısın"
        buttons={[
          {
            text: 'Giriş yap',
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
        title="Favori yok"
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
