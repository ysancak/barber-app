import React from 'react';
import {StyleSheet} from 'react-native';

import EmptyPage from './EmptyPage';

type Props = {
  onPress: () => void;
};

const ErrorResult: React.FC<Props> = ({onPress}) => {
  return (
    <EmptyPage
      animation="error"
      title="Hata"
      description="Beklenmeyen bir hata oluştu. Daha sonra tekrar deneyiniz"
      buttons={[
        {
          text: 'Yeniden dene',
          type: 'default',
          onPress: onPress,
        },
      ]}
    />
  );
};

export default ErrorResult;

const styles = StyleSheet.create({});
