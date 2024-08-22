import {useRoute} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {SafeAreaView, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';

import {
  HeaderRightButton,
  Input,
  KeyboardAvoidingView,
  View,
} from '@/components';
import {useFetch, useNavigation} from '@/hooks';
import {createWorkerDayOffSchema} from '@/schemas/validations';
import {
  adminEditDayOffService,
  adminGetWorkersService,
} from '@/services/admin.service';
import {editUpcomingDayOff} from '@/store/admin/dayoffs';
import {colors} from '@/utils';
import {showSuccessToast} from '@/utils/toast';

export default function EditDayOff() {
  const {params: dayOff}: {params: WorkerDayOff} = useRoute();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    data: workersData,
    fetch,
    loading: workersLoading,
  } = useFetch(adminGetWorkersService);

  const formik = useFormik({
    initialValues: {
      _id: dayOff._id,
      workerID: dayOff.workerID,
      HolidayStartDate: new Date(dayOff.HolidayStartDate),
      HolidayEndDate: new Date(dayOff.HolidayEndDate),
    },
    validateOnChange: true,
    validateOnBlur: false,
    validationSchema: createWorkerDayOffSchema,
    onSubmit: async values => {
      try {
        const result = await adminEditDayOffService({
          dayOffId: dayOff._id,
          dayOff: values as WorkerDayOff,
        });
        if (result) {
          dispatch(editUpcomingDayOff(result));
          navigation.goBack();
          showSuccessToast(t('editDayOff.toast.savedSuccess'));
        }
      } finally {
      }
    },
  });

  useEffect(() => {
    fetch();
  }, []);

  navigation.setOptions({
    headerRight() {
      return (
        <HeaderRightButton
          title={t('general.save')}
          onPress={formik.submitForm}
          loading={formik.isSubmitting || formik.isValidating || workersLoading}
          disabled={
            formik.isValidating || formik.isSubmitting || workersLoading
          }
        />
      );
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.scrollView}>
            <Input.Select
              placeholder={t('editDayOff.form.workerID.placeholder')}
              loading={workersLoading}
              options={workersData}
              onChange={id => formik.setFieldValue('workerID', id)}
              optionLabel="fullName"
              optionValue="_id"
              value={formik.values.workerID}
              error={formik.touched.workerID && formik.errors.workerID}
            />

            <View style={styles.timeInputRow}>
              <Input.Date
                placeholder={t('editDayOff.form.holidayStartDate.placeholder')}
                mode="date"
                size="input"
                disabled={workersLoading}
                date={formik.values.HolidayStartDate}
                onChange={date =>
                  formik.setFieldValue('HolidayStartDate', date)
                }
                error={
                  formik.touched.HolidayStartDate &&
                  formik.errors.HolidayStartDate
                }
              />
              <Input.Date
                placeholder={t('editDayOff.form.holidayEndDate.placeholder')}
                mode="date"
                size="input"
                disabled={workersLoading}
                date={formik.values.HolidayEndDate}
                onChange={date => formik.setFieldValue('HolidayEndDate', date)}
                error={
                  formik.touched.HolidayEndDate && formik.errors.HolidayEndDate
                }
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  scrollView: {
    flex: 1,
    padding: 16,
    gap: 16,
    backgroundColor: colors.bgColor,
  },
  timeInputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
});
