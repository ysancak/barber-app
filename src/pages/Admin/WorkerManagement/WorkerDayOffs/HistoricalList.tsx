import React from 'react';
import {ScrollView} from 'react-native';

import ListItem from './components/ListItem';

export default function HistoricalList() {
  const data = [
    {
      id: '1',
      name: 'Onur',
      surname: 'Ceran',
      startDate: '28.2.2024',
      endDate: '1.3.2024',
    },
    {
      id: '2',
      name: 'Max',
      surname: 'Muster',
      startDate: '28.2.2024',
      endDate: '1.3.2024',
    },
  ];

  console.log('HistoricalList');

  return (
    <ScrollView>
      {data.map((item, index) => (
        <ListItem key={index} {...item} />
      ))}
    </ScrollView>
  );
}
