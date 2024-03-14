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
  adminGetCelandarEventService,
  adminGetWorkersService,
} from '@/services/admin.service';
import {addEvent} from '@/store/admin/calendar';
import {colors} from '@/utils';
import {showSuccessToast} from '@/utils/toast';

// TODO: dil dosyasını entegre et

export default function AddEvent() {
  const {params}: {params: {date?: string}} = useRoute();
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
      startHour: '',
      endHour: '',
      orderNote: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: createCalendarEventSchema,
    onSubmit: async values => {
      console.log(values);
      try {
        values.date = moment(values.date).format('YYYY-MM-DD');
        const result = await adminCreateCalendarEventService(values);
        if (result) {
          dispatch(addEvent(result as CalendarEvent));
          navigation.goBack();
          // TODO: dil dosyasını entegre et
          showSuccessToast(t('addWorker.toast.savedSuccess'));
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
          <SectionHeader title="Çalışan bilgileri" />

          <View paddingHorizontal={16} gap={10} paddingVertical={12}>
            <Input.Select
              placeholder="Çalışan seçin"
              options={workersData}
              loading={workersLoading}
              optionLabel="name"
              optionValue="_id"
              value={formik.values.workerID}
              onChange={formik.handleChange('workerID')}
              error={formik.touched.workerID && formik.errors.workerID}
            />
          </View>

          <SectionHeader title="Müşteri bilgileri" />

          <View paddingHorizontal={16} gap={10} paddingVertical={12}>
            <View flexDirection="row" gap={12}>
              <View flex>
                <Input.Text
                  placeholder="Müşteri adı"
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
                  placeholder="Müşteri soyaadı"
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
              placeholder="Müşteri telefon numarası"
              keyboardType="phone-pad"
              value={formik.values.clientTel}
              onBlur={() => formik.handleBlur('clientTel')}
              onChange={formik.handleChange('clientTel')}
              error={formik.touched.clientTel && formik.errors.clientTel}
            />
          </View>

          <SectionHeader title="Tarih" />

          <View paddingHorizontal={16} gap={10} paddingVertical={12}>
            <Input.Date
              placeholder="Tarih seçin"
              mode="date"
              size="input"
              date={formik.values.date}
              onChange={date => formik.setFieldValue('date', date)}
              error={formik.touched.date && formik.errors.date}
            />
            <View flexDirection="row" gap={12}>
              <Input.Date
                placeholder="Başlangıç saati"
                mode="time"
                size="input"
                date={formik.values.startHour}
                onChange={date => formik.setFieldValue('startHour', date)}
                error={formik.touched.startHour && formik.errors.startHour}
              />
              <Input.Date
                placeholder="Bitiş saati"
                mode="time"
                size="input"
                date={formik.values.endHour}
                onChange={date => formik.setFieldValue('endHour', date)}
                error={formik.touched.endHour && formik.errors.endHour}
              />
            </View>
          </View>

          <SectionHeader title="Diğer bilgiler" />
          <View paddingHorizontal={16} gap={10} paddingVertical={12}>
            <Input.Text
              placeholder="Not"
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
