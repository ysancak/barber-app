import LottieView from 'lottie-react-native';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from './Button';
import Text from './Text';
import View from './View';

import {empty, error, heart, success} from '@/assets/animations';
import {colors} from '@/utils';
import {wp} from '@/utils/responsive';

type Props = {
  icon?: string;
  animation?: 'success' | 'error' | 'empty' | 'heart';
  title: string;
  description: string;
  buttons?: ButtonProps[];
};

const EmptyPage: React.FC<Props> = ({
  icon,
  animation,
  title,
  description,
  buttons,
}) => {
  const animationSource = useMemo(() => {
    switch (animation) {
      case 'success':
        return success;
      case 'error':
        return error;
      case 'empty':
        return empty;
      case 'heart':
        return heart;
    }
  }, [animation]);

  return (
    <View style={styles.container}>
      <View>
        {animation ? (
          <LottieView
            source={animationSource}
            autoPlay
            resizeMode="cover"
            style={styles.animation}
          />
        ) : icon ? (
          <Icon
            name={icon}
            size={90}
            color={colors.captionTextColor}
            style={styles.icon}
          />
        ) : undefined}
      </View>
      <Text textAlign="center" fontSize={22} semibold>
        {title}
      </Text>
      <Text textAlign="center">{description}</Text>
      <View style={styles.buttonContainer}>
        {buttons?.map((button, index) => (
          <Button
            key={`btn-${index}`}
            variant={button.type === 'cancel' ? 'secondary' : button.type}
            label={button.text}
            onPress={button.onPress}
          />
        ))}
      </View>
    </View>
  );
};

export default EmptyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    paddingHorizontal: wp(10),
    backgroundColor: colors.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  icon: {
    marginBottom: 20,
  },
  animation: {
    width: 140,
    height: 140,
  },
});
