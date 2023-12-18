import {useRoute} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

import {View} from '@/components';
import {useNavigation} from '@/hooks';
import {showErrorToast} from '@/utils/toast';

const Payment = () => {
  const {t} = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const renderLoading = useMemo(() => {
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return null;
  }, [loading]);

  const onMessageHandler = data => {
    const nativeEventData = data?.nativeEvent?.data;
    if (nativeEventData === 'Success') {
      navigation.navigate('OrderResult', {businessID: route.params.businessID});
    } else if (nativeEventData === 'Error') {
      showErrorToast(t('payment.alert.error.title'));
      navigation.goBack();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View flex>
      {renderLoading}
      <WebView
        scalesPageToFit={false}
        mixedContentMode="compatibility"
        onMessage={onMessageHandler}
        onLoadProgress={() => setLoading(true)}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        originWhitelist={['*']}
        source={{uri: route.params.link}}
        style={{flex: 1}}
      />
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#FFFFFF70',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
