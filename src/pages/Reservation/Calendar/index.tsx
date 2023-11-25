import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import CalendarView from './components/CalendarView';

import {
  Button,
  EmptyPage,
  ErrorResult,
  Input,
  SkeletonLoading,
  View,
} from '@/components';
import {useFetch, useNavigation} from '@/hooks';
import {getSaloonWorkers} from '@/services/saloon.service';
import {colors} from '@/utils';

const Calendar = () => {
  const navigation = useNavigation();
  const {
    params: {businessID},
  } = useRoute();
  const [selectedWorker, setSelectedWorker] = useState<string>('');
  const saloonWorkersFetch = useFetch(getSaloonWorkers);

  useEffect(() => {
    saloonWorkersFetch.fetch({businessID});
  }, []);

  useEffect(() => {
    if (saloonWorkersFetch.data?.length) {
      setSelectedWorker(saloonWorkersFetch.data[0]._id);
    }
  }, [saloonWorkersFetch.data]);

  if (saloonWorkersFetch.loading) {
    return <SkeletonLoading.Calendar />;
  }

  if (saloonWorkersFetch.error) {
    return <ErrorResult onPress={saloonWorkersFetch.retry} />;
  }

  if (!saloonWorkersFetch.data?.length) {
    return (
      <EmptyPage
        animation="empty"
        title="Çalışan bulunamadı"
        description="Bu işletmede hizmet verecek bir çalışan bulunmuyor"
      />
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.innerContainer}>
          <View style={styles.workerSelectorContainer}>
            <View style={styles.selectContainer}>
              <Input.Select
                options={saloonWorkersFetch.data}
                optionLabel="fullname"
                optionValue="_id"
                placeholder="Bir çalışan seçin"
                onChange={id => setSelectedWorker(id)}
                value={selectedWorker}
                loading={saloonWorkersFetch.loading}
              />
            </View>
          </View>
          {selectedWorker && (
            <CalendarView businessID={businessID} workerID={selectedWorker} />
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            label="Devam et"
            onPress={() =>
              navigation.navigate('ReservationUserInfo', {businessID})
            }
          />
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
