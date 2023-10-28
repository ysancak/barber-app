import React from 'react';

import Text from './Text';

interface Props {
  title: string;
}

const HeaderTitle: React.FC<Props> = ({title}) => {
  return (
    <Text variant="content" semibold fontSize={17}>
      {title}
    </Text>
  );
};

export default HeaderTitle;
