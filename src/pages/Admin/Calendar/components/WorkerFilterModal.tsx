import React, {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import {
  EmptyPage,
  ErrorResult,
  RadioListItem,
  SkeletonLoading,
  Text,
  View,
} from '@/components';
import {useFetch} from '@/hooks';
import {adminGetWorkersService} from '@/services/admin.service';
import {setWorker} from '@/store/admin/calendar';
import {colors} from '@/utils';
import {hp} from '@/utils/responsive';

export default function WorkerFilterModal() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {worker} = useSelector(state => state.calendar);
  const {fetch, data, loading, refresh, refreshing, error, retry} = useFetch(
    adminGetWorkersService,
  );
  const activeWorkerID = worker ? worker._id : undefined;

  useEffect(() => {
    if (!data) {
      fetch();
    }
  }, [data, actionSheetRef.current?.isOpen]);

  const onSelectHandler = (worker: Worker) => {
    dispatch(setWorker(activeWorkerID == worker._id ? undefined : worker));
    actionSheetRef.current?.hide();
  };

  const renderModalContent = () => {
    if (loading && !data) {
      return <SkeletonLoading.List />;
    }

    if (error) {
      return <ErrorResult onPress={retry} />;
    }

    if (!data?.length) {
      return (
        <EmptyPage
          animation="empty"
          title={t('adminCalendar.workerModal.empty.title')}
          description={t('adminCalendar.workerModal.empty.description')}
        />
      );
    }

    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }>
        {data.map((item: Worker, index: number) => (
          <RadioListItem
            key={index}
            label={item.fullName}
            active={activeWorkerID === item._id}
            onPress={() => onSelectHandler(item)}
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <>
      <TouchableOpacity onPress={() => actionSheetRef.current?.show()}>
        <Icon name="person-outline" size={26} color={colors.primaryColor} />
      </TouchableOpacity>
      <ActionSheet ref={actionSheetRef} useBottomSafeAreaPadding>
        <View style={{height: hp(50)}}>
          <View style={styles.container}>
            <Text variant="title" fontSize={18}>
              {t('adminCalendar.workerModal.title')}
            </Text>
          </View>
          {renderModalContent()}
        </View>
      </ActionSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    backgroundColor: colors.bgColor,
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
