import {useRoute} from '@react-navigation/native';
import React, {useMemo, useState, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet, Linking, Platform} from 'react-native';
import {WebView} from 'react-native-webview';

import {View} from '@/components';
import {showAlert} from '@/components/Alert';
import {useNavigation} from '@/hooks';
import {showErrorToast} from '@/utils/toast';

const Payment = () => {
  const {t} = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const webViewRef = useRef(null);

  const renderLoading = useMemo(() => {
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="white" />
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

  const onShouldStartLoadWithRequest = navState => {
    console.log('navState', navState);

    const supportedSchemes = [
      {prefix: 'twint-issuer', appName: 'TWINT'},
      {prefix: 'postfinance', appName: 'PostFinance'},
      {prefix: 'intent:', appName: 'TWINT'},
    ];

    const matchedScheme = supportedSchemes.find(scheme =>
      navState.url.startsWith(scheme.prefix),
    );

    if (matchedScheme) {
      webViewRef.current?.stopLoading();

      if (Platform.OS === 'android' && navState.url.startsWith('intent:')) {
        const url = navState.url;
        const codeMatch = url.match(/S\.code=(\d+)/);
        const code = codeMatch ? codeMatch[1] : '0';
        const startingOriginMatch = url.match(/S\.startingOrigin=([^;]+)/);
        const startingOrigin = startingOriginMatch
          ? startingOriginMatch[1]
          : 'EXTERNAL_WEB_BROWSER';
        const fallbackUrlMatch = url.match(/S\.browser_fallback_url=([^;]+)/);
        const fallbackUrl = fallbackUrlMatch ? fallbackUrlMatch[1] : '';

        Linking.sendIntent('ch.twint.action.TWINT_PAYMENT', [
          {key: 'scheme', value: 'twint'},
          {key: 'S.code', value: code},
          {key: 'S.startingOrigin', value: startingOrigin},
          {key: 'S.browser_fallback_url', value: fallbackUrl},
        ])
          .then(() => {
            setLoading(false);
          })
          .catch(() => {
            showAlert({
              title: t('payment.alert.app_not_opened.title'),
              content: t('payment.alert.app_not_opened.description'),
              buttons: [
                {
                  text: t('general.ok'),
                  type: 'default',
                  onPress: () => {
                    navigation.goBack();
                  },
                },
              ],
            });
          });
        return false;
      }

      Linking.canOpenURL(navState.url)
        .then(supported => {
          if (supported) {
            setLoading(false);
            return Linking.openURL(navState.url);
          } else {
            showAlert({
              title: t('payment.alert.app_not_opened.title'),
              content: t('payment.alert.app_not_opened.description'),
              buttons: [
                {
                  text: t('general.ok'),
                  type: 'default',
                  onPress: () => {
                    navigation.goBack();
                  },
                },
              ],
            });
          }
        })
        .catch(() => {
          showAlert({
            title: t('payment.alert.app_not_opened.title'),
            content: t('payment.alert.app_not_opened.description'),
            buttons: [
              {
                text: t('general.ok'),
                type: 'default',
                onPress: () => {
                  navigation.goBack();
                },
              },
            ],
          });
        });
      return false;
    }
    return true;
  };

  return (
    <View flex>
      {renderLoading}
      <WebView
        ref={webViewRef}
        scalesPageToFit={false}
        mixedContentMode="compatibility"
        onMessage={onMessageHandler}
        onLoadProgress={() => setLoading(true)}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        originWhitelist={['*']}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
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
    backgroundColor: '#00000090',
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
