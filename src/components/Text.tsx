import React from 'react';
import {
  StyleSheet,
  Text as BaseText,
  TextProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import {colors, typography} from '@/utils';

interface Props extends TextProps {
  fontSize?: number;
  color?: string;
  variant?: 'title' | 'content' | 'subtitle' | 'caption';
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  fontStyle?: 'normal' | 'italic';
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const Text: React.FC<Props> = ({
  fontSize,
  color,
  variant = 'content',
  textAlign,
  fontStyle,
  textTransform,
  children,
  style,
  ...restProps
}) => {
  const textStyle: StyleProp<TextStyle> = [
    styles.text,
    variant && styles[variant],
    fontSize && {fontSize},
    textAlign && {textAlign},
    fontStyle && {fontStyle},
    textTransform && {textTransform},
    color && {color},
    style,
  ];

  return (
    <BaseText {...restProps} style={textStyle}>
      {children}
    </BaseText>
  );
};

export default Text;

const styles = StyleSheet.create({
  text: {
    color: colors.textColor,
  },
  title: {
    fontSize: typography.titleFontSize,
    fontWeight: 'bold',
    fontFamily: 'EncodeSans-Bold',
  },
  content: {
    fontSize: typography.contentFontSize,
    fontFamily: 'EncodeSans-Regular',
  },
  subtitle: {
    fontSize: typography.subtitleFontSize,
    fontWeight: '500',
    fontFamily: 'EncodeSans-Medium',
  },
  caption: {
    fontSize: typography.captionFontSize,
    color: colors.captionTextColor,
    fontFamily: 'EncodeSans-SemiBold',
  },
});
