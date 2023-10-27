import React from 'react';
import {ViewProps} from 'react-native';
import View from './View';

interface SpaceProps extends ViewProps {
  size?: number;
  direction?: 'vertical' | 'horizontal';
}

const Space: React.FC<SpaceProps> = ({
  size = 10,
  direction = 'vertical',
  ...props
}) => {
  const style = {
    width: direction === 'horizontal' ? size : 0,
    height: direction === 'vertical' ? size : 0,
  };

  return <View style={style} {...props} />;
};

export default Space;
