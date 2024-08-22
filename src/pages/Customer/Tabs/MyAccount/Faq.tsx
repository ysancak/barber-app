import React, {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native';

import FaqListItem from './components/FaqListItem';

import {View} from '@/components';
import {useFetch} from '@/hooks';
import {getFaqService} from '@/services/common.service';
import {colors} from '@/utils';

function Faq(): JSX.Element {
  const {fetch, loading, data} = useFetch(getFaqService);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <View paddingVertical={60}>
          <ActivityIndicator />
        </View>
      ) : (
        data?.map(item => <FaqListItem key={`faq_${item._id}`} {...item} />)
      )}
    </ScrollView>
  );
}

export default Faq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
});
