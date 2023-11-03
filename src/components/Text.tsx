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
  bold?: boolean;
  medium?: boolean;
  semibold?: boolean;
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
  bold,
  medium,
  semibold,
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
    bold && styles.bold,
    semibold && styles.semiBold,
    medium && styles.medium,
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
  bold: {
    fontFamily: 'EncodeSans-Bold',
  },
  medium: {
    fontFamily: 'EncodeSans-Medium',
  },
  semiBold: {
    fontWeight: '700',
    fontFamily: 'EncodeSans-SemiBold',
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
