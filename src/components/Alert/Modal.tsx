import React from 'react';
import {View, StyleSheet, ViewStyle, TextStyle, StyleProp} from 'react-native';
import Modal from 'react-native-modal';

import Button from '../Button';
import Text from '../Text';

export type AlertProps = {
  title: string;
  content: string;
  buttons: ButtonProps[];
  isVisible: boolean;
  onHide?: () => void;
  isBackdropPress?: boolean;
  customStyles?: StyleProp<ViewStyle>;
  customTitleStyles?: StyleProp<TextStyle>;
  customContentStyles?: StyleProp<TextStyle>;
};

const Alert: React.FC<AlertProps> = ({
  isVisible,
  title,
  content,
  buttons,
  onHide,
  isBackdropPress = false,
  customStyles = {},
}) => {
  const onPressHandler = (onPress?: () => void) => {
    if (onHide) {
      onHide();
    }
    if (onPress) {
      onPress();
    }
  };

  const renderButtons = () => {
    return buttons.map((button, index) => {
      return (
        <Button
          key={`modal-button-${index}`}
          variant={button.type === 'cancel' ? 'secondary' : button.type}
          label={button.text}
          onPress={() => onPressHandler(button.onPress)}
        />
      );
    });
  };

  return (
    <Modal
      isVisible={isVisible}
      animationInTiming={200}
      animationOutTiming={200}
      onBackdropPress={isBackdropPress ? onHide : undefined}>
      <View style={[styles.container, customStyles]}>
        <Text fontSize={18} semibold textAlign="center">
          {title}
        </Text>
        <Text textAlign="center">{content}</Text>
        <View style={styles.buttonsContainer}>{renderButtons()}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 6,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 16,
    gap: 10,
  },
});

export default Alert;
