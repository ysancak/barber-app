import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native';

import FaqListItem from './components/FaqListItem';

import {View} from '@/components';
import {getFaqService} from '@/services/common.service';
import {colors} from '@/utils';

function Faq(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [faq, setFaq] = useState<FaqResponse[]>();

  useEffect(() => {
    getFaqList();
  }, []);

  const getFaqList = async () => {
    setLoading(true);
    try {
      const result = await getFaqService();
      setFaq(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <View paddingVertical={60}>
          <ActivityIndicator />
        </View>
      ) : (
        faq?.map(item => <FaqListItem key={`faq_${item._id}`} {...item} />)
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
