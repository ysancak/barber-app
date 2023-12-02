import React from 'react';
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  StyleSheet,
  Platform,
  ViewStyle,
} from 'react-native';

interface Props {
  style?: ViewStyle;
  children: React.ReactNode;
}

const KeyboardAvoidingView: React.FC<Props> = ({style, children}) => {
  return (
    <RNKeyboardAvoidingView
      style={[styles.container, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}>
      {children}
    </RNKeyboardAvoidingView>
  );
};

export default KeyboardAvoidingView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
