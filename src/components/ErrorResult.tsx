import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

import EmptyPage from './EmptyPage';

type Props = {
  onPress: () => void;
};

const ErrorResult: React.FC<Props> = ({onPress}) => {
  const {t} = useTranslation();
  return (
    <EmptyPage
      animation="error"
      title={t('errorResult.title')}
      description={t('errorResult.description')}
      buttons={[
        {
          text: t('errorResult.action'),
          type: 'default',
          onPress: onPress,
        },
      ]}
    />
  );
};

export default ErrorResult;

const styles = StyleSheet.create({});
