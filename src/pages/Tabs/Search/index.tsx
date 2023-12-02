import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';

import {
  EmptyPage,
  Input,
  SaloonListItem,
  SkeletonLoading,
  View,
} from '@/components';
import {useFetch} from '@/hooks';
import {getMapSaloonsService} from '@/services/saloon.service';
import {colors} from '@/utils';

const Search = () => {
  const {t} = useTranslation();
  const {fetch, data, loading, error, refresh, refreshing} =
    useFetch(getMapSaloonsService);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSaloons();
  }, [searchTerm]);

  const fetchSaloons = () => {
    if (searchTerm && !loading && !refreshing) {
      fetch({searchKey: searchTerm});
    }
  };

  const renderContent = useMemo(() => {
    if (!searchTerm) {
      return <></>;
    }

    if (loading && !refreshing) {
      return <SkeletonLoading.List />;
    }

    if ((!loading && !data?.length) || error) {
      return (
        <EmptyPage
          title={t('search.empty.title')}
          description={t('search.empty.description')}
        />
      );
    }

    return (
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={style.contentContainerStyle}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }>
        {data?.map(saloon => (
          <SaloonListItem key={`saloon-${saloon._id}`} {...saloon} />
        ))}
      </ScrollView>
    );
  }, [searchTerm, data, loading, error, refreshing]);

  return (
    <View flex style={style.container}>
      <View style={style.inputContainer}>
        <Input.Text
          autoFocus
          placeholder={t('search.placeholder')}
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </View>
      {renderContent}
    </View>
  );
};

export default Search;

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.whiteColor,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
  },
  contentContainerStyle: {
    padding: 16,
    gap: 12,
  },
});
