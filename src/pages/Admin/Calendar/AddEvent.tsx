import {useRoute} from '@react-navigation/native';
import {useFormik} from 'formik';
import moment from 'moment';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  HeaderRightButton,
  Input,
  KeyboardAvoidingView,
  SectionHeader,
  View,
} from '@/components';
import {useFetch, useNavigation} from '@/hooks';
import {createCalendarEventSchema} from '@/schemas/validations';
import {
  adminCreateCalendarEventService,
  adminGetWorkersService,
} from '@/services/admin.service';
import {addEvent} from '@/store/admin/calendar';
import {colors} from '@/utils';
import {showSuccessToast} from '@/utils/toast';

export default function AddEvent() {
  const {params}: {params: {date?: string; startHour?: string}} = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {
    data: workersData,
    fetch,
    loading: workersLoading,
  } = useFetch(adminGetWorkersService);
  const {worker} = useSelector(state => state.calendar);

  const formik = useFormik({
    initialValues: {
      workerID: worker?._id || '',
      customerName: '',
      customerSurname: '',
      clientTel: '',
      date: params?.date ? new Date(params.date) : '',
      startDate: moment(),
      endDate: moment(),
      startHour: '',
      endHour: '',
      orderNote: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: createCalendarEventSchema,
    onSubmit: async values => {
      try {
        values.date = moment(values.date).format('YYYY-MM-DD');
        const startDate = moment(values.date)
          .hour(Number(values.startHour.slice(0, 2)))
          .minute(Number(values.startHour.slice(-2)));
        const endDate = moment(values.date)
          .hour(Number(values.endHour.slice(0, 2)))
          .minute(Number(values.endHour.slice(-2)));
        values.startDate = startDate;
        values.endDate = endDate;

        const result = await adminCreateCalendarEventService(values);
        console.log(result);

        if (result) {
          dispatch(addEvent(result as CalendarEvent));
          navigation.goBack();
          showSuccessToast(t('adminCalendarAddEvent.toast.savedSuccess'));
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
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{paddingBottom: 50}}>
          <SectionHeader title={t('adminCalendarAddEvent.section.worker')} />

          <View paddingHorizontal={16} gap={10} paddingVertical={12}>
            <Input.Select
              placeholder={t('adminCalendarAddEvent.form.workerID.placeholder')}
              options={workersData}
              loading={workersLoading}
              optionLabel="name"
              optionValue="_id"
              value={formik.values.workerID}
              onChange={formik.handleChange('workerID')}
              error={formik.touched.workerID && formik.errors.workerID}
            />
          </View>

          <SectionHeader title={t('adminCalendarAddEvent.section.customer')} />

          <View paddingHorizontal={16} gap={10} paddingVertical={12}>
            <View flexDirection="row" gap={12}>
              <View flex>
                <Input.Text
                  placeholder={t(
                    'adminCalendarAddEvent.form.customerName.placeholder',
                  )}
                  value={formik.values.customerName}
                  onBlur={() => formik.handleBlur('customerName')}
                  onChange={formik.handleChange('customerName')}
                  error={
                    formik.touched.customerName && formik.errors.customerName
                  }
                />
              </View>
              <View flex>
                <Input.Text
                  placeholder={t(
                    'adminCalendarAddEvent.form.customerSurname.placeholder',
                  )}
                  value={formik.values.customerSurname}
                  onBlur={() => formik.handleBlur('customerSurname')}
                  onChange={formik.handleChange('customerSurname')}
                  error={
                    formik.touched.customerSurname &&
                    formik.errors.customerSurname
                  }
                />
              </View>
            </View>

            <Input.Text
              placeholder={t(
                'adminCalendarAddEvent.form.clientTel.placeholder',
              )}
              keyboardType="phone-pad"
              value={formik.values.clientTel}
              onBlur={() => formik.handleBlur('clientTel')}
              onChange={formik.handleChange('clientTel')}
              error={formik.touched.clientTel && formik.errors.clientTel}
            />
          </View>

          <SectionHeader title={t('adminCalendarAddEvent.section.date')} />

          <View paddingHorizontal={16} gap={10} paddingVertical={12}>
            <Input.Date
              placeholder={t('adminCalendarAddEvent.form.date.placeholder')}
              mode="date"
              size="input"
              date={formik.values.date}
              onChange={date => formik.setFieldValue('date', date)}
              error={formik.touched.date && formik.errors.date}
            />
            <View flexDirection="row" gap={12}>
              <Input.Date
                placeholder={t(
                  'adminCalendarAddEvent.form.startHour.placeholder',
                )}
                mode="time"
                size="input"
                date={formik.values.startHour}
                onChange={date => formik.setFieldValue('startHour', date)}
                error={formik.touched.startHour && formik.errors.startHour}
              />
              <Input.Date
                placeholder={t(
                  'adminCalendarAddEvent.form.endHour.placeholder',
                )}
                mode="time"
                size="input"
                date={formik.values.endHour}
                onChange={date => formik.setFieldValue('endHour', date)}
                error={formik.touched.endHour && formik.errors.endHour}
              />
            </View>
          </View>

          <SectionHeader title={t('adminCalendarAddEvent.section.other')} />

          <View paddingHorizontal={16} gap={10} paddingVertical={12}>
            <Input.Text
              placeholder={t(
                'adminCalendarAddEvent.form.orderNote.placeholder',
              )}
              value={formik.values.orderNote}
              onBlur={() => formik.handleBlur('orderNote')}
              onChange={formik.handleChange('orderNote')}
              error={formik.touched.orderNote && formik.errors.orderNote}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
});
