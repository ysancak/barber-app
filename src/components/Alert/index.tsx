import React, {useState} from 'react';

import Alert, {AlertProps} from './Modal';

type AlertControllerProps = Omit<AlertProps, 'isVisible'> & {
  onHide?: () => void;
};

let showAlertFunction: (alertProps: AlertControllerProps) => void;

const AlertController: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [alertProps, setAlertProps] = useState<AlertControllerProps>({
    title: '',
    content: '',
    onHide: undefined,
    buttons: [],
    customStyles: {},
    customTitleStyles: {},
    customContentStyles: {},
  });

  const showAlert = (newAlertProps: AlertControllerProps) => {
    setAlertProps(newAlertProps);
    setTimeout(() => {
      setIsVisible(true);
    }, 300);
  };

  const onHide = () => {
    setIsVisible(false);
    if (alertProps.onHide) {
      alertProps.onHide();
    }
  };

  showAlertFunction = showAlert;

  return <Alert {...alertProps} isVisible={isVisible} onHide={onHide} />;
};

export const showAlert = (alertProps: AlertControllerProps) => {
  showAlertFunction(alertProps);
};

export default AlertController;
