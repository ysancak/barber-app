import LottieView from 'lottie-react-native';
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from './Button';
import Text from './Text';
import View from './View';

import {error, heart} from '@/assets/animations';
import {colors} from '@/utils';
import {wp} from '@/utils/responsive';

type Props = {
  icon?: string;
  animation?: 'heart' | 'error';
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
      case 'error':
        return error;
      case 'heart':
        return heart;
    }
  }, [animation]);

  const animationStyle = {width: 160, height: 160};

  return (
    <View style={styles.container}>
      <View>
        {animation ? (
          <LottieView
            source={animationSource}
            autoPlay
            loop
            resizeMode="cover"
            style={animationStyle}
          />
        ) : icon ? (
          <Icon name={icon} size={90} color={colors.captionTextColor} />
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
});
