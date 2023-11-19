import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {Button, Input, Text, View} from '@/components';
import {colors} from '@/utils';

const Calendar = () => {
  const [workers, setWorkers] = useState([
    {_id: '1', name: 'Yusuf'},
    {_id: '2', name: 'John'},
  ]);
  const [selectedWorker, setSelectedWorker] = useState('1');

  return (
    <View
      style={{
        flex: 1,
      }}>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.whiteColor}}>
        <View style={{flex: 1, backgroundColor: colors.bgColor}}>
          <View
            style={{
              paddingHorizontal: 16,
              gap: 8,
              paddingVertical: 12,
              backgroundColor: colors.whiteColor,
              borderBottomWidth: 1,
              borderColor: colors.borderColor3,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text variant="caption" color={colors.textColor}>
              Worker:
            </Text>
            <View style={{flex: 1}}>
              <Input.Select
                options={workers}
                optionLabel="name"
                optionValue="_id"
                placeholder="Bir worker seçin"
                onChange={item => setSelectedWorker(item)}
                value={selectedWorker}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: colors.whiteColor,
            borderTopWidth: 1,
            borderColor: colors.borderColor3,
          }}>
          <Button label="Devam et" />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({});
