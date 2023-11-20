import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {Button, CustomCalendar, Input, Text, View} from '@/components';
import {colors} from '@/utils';

const Calendar = () => {
  const [workers, setWorkers] = useState([
    {_id: '1', name: 'Yusuf'},
    {_id: '2', name: 'John'},
  ]);
  const [selectedWorker, setSelectedWorker] = useState();

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.innerContainer}>
          <View style={styles.workerSelectorContainer}>
            <View style={styles.selectContainer}>
              <Input.Select
                options={workers}
                optionLabel="name"
                optionValue="_id"
                placeholder="Bir çalışan seçin"
                onChange={item => setSelectedWorker(item)}
                value={selectedWorker}
              />
            </View>
          </View>
          <CustomCalendar />
        </View>
        <View style={styles.buttonContainer}>
          <Button label="Devam et" />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  workerSelectorContainer: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 12,
    backgroundColor: colors.whiteColor,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectContainer: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.whiteColor,
    borderTopWidth: 1,
    borderColor: colors.borderColor3,
  },
});
