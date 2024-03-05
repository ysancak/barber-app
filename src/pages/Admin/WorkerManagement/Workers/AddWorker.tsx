import {useFormik} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  HeaderRightButton,
  Input,
  KeyboardAvoidingView,
  SectionHeader,
  Text,
  View,
} from '@/components';
import {useNavigation} from '@/hooks';
import {createWorkerSchema} from '@/schemas/validations';
import {colors} from '@/utils';

export default function AddWorker() {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      workerColor: colors.workerColors[0],
      hours: {
        0: [{start: '', end: '', offday: 'on'}],
        1: [{start: '', end: '', offday: 'off'}],
        2: [{start: '', end: '', offday: 'off'}],
        3: [{start: '', end: '', offday: 'off'}],
        4: [{start: '', end: '', offday: 'off'}],
        5: [{start: '', end: '', offday: 'off'}],
        6: [{start: '', end: '', offday: 'off'}],
      },
    },
    validationSchema: createWorkerSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

  navigation.setOptions({
    title: 'Çalışan Ekle',
    headerRight() {
      return (
        <HeaderRightButton
          title={t('general.save')}
          onPress={console.log}
          disabled
        />
      );
    },
  });

  const addHour = day => {
    const newHours = formik.values.hours[day].concat({
      start: '',
      end: '',
      offday: 'off',
      _id: `new-${Math.random()}`,
    });
    formik.setFieldValue(`hours.${day}`, newHours);
  };

  const removeHour = (day, index) => {
    let hours = [...formik.values.hours[day]];
    if (hours.length > 1) {
      hours.splice(index, 1);
      formik.setFieldValue(`hours.${day}`, hours);
    }
  };

  const toggleDayStatus = day => {
    const isOffday = formik.values.hours[day][0].offday === 'on';
    const newStatus = isOffday ? 'off' : 'on';
    formik.setFieldValue(`hours.${day}`, [
      {
        start: '',
        end: '',
        offday: newStatus,
        _id: formik.values.hours[day][0]._id,
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView style={styles.scrollView}>
          <SectionHeader title={'Çalışan bilgileri'} />
          <View paddingHorizontal={16} gap={10} paddingVertical={12}>
            <View flexDirection="row" gap={10}>
              <View flex>
                <Input.Text
                  icon="person"
                  placeholder={'İsim'}
                  onChange={formik.handleChange('name')}
                  onBlur={() => formik.handleBlur('name')}
                  value={formik.values.name}
                  error={formik.touched.name && formik.errors.name}
                />
              </View>
              <View flex>
                <Input.Text
                  icon="person"
                  placeholder={'Soyisim'}
                  onChange={formik.handleChange('surname')}
                  onBlur={() => formik.handleBlur('surname')}
                  value={formik.values.surname}
                  error={formik.touched.surname && formik.errors.surname}
                />
              </View>
            </View>
            <View style={styles.colorContainer}>
              {colors.workerColors.map(color => (
                <TouchableOpacity
                  key={color}
                  activeOpacity={0.8}
                  style={styles.colorBg}
                  onPress={() => formik.setFieldValue('workerColor', color)}>
                  <View
                    style={{...styles.colorObject, backgroundColor: color}}
                  />
                  {formik.values.workerColor === color && (
                    <View style={styles.colorActiveCircle} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <SectionHeader title={'Çalışma saatleri'} />

          {Object.keys(formik.values.hours).map((day, index) => (
            <View key={index}>
              <View style={styles.hourToggle}>
                <Text variant="subtitle" fontSize={16}>
                  {day}
                </Text>
                <View style={styles.toggleSwitchContainer}>
                  {formik.values.hours[day][0].offday === 'off' && (
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => addHour(day)}>
                      <Icon name="add" size={28} />
                    </TouchableOpacity>
                  )}
                  <Input.Switch
                    value={formik.values.hours[day][0].offday === 'off'}
                    onChange={() => toggleDayStatus(day)}
                  />
                </View>
              </View>
              {formik.values.hours[day][0].offday === 'off' && (
                <View style={styles.expandedSection}>
                  {formik.values.hours[day].map((hour, index) => (
                    <View key={index}>
                      <View style={styles.timeInputRow}>
                        <Input.Date
                          placeholder="Başlangıç"
                          mode="time"
                          date={hour.start}
                          onChange={value => {
                            const newHours = [...formik.values.hours[day]];
                            newHours[index].start = value;
                            formik.setFieldValue(`hours.${day}`, newHours);
                          }}
                        />
                        <Input.Date
                          placeholder="Bitiş"
                          mode="time"
                          date={hour.end}
                          onChange={value => {
                            const newHours = [...formik.values.hours[day]];
                            newHours[index].end = value;
                            formik.setFieldValue(`hours.${day}`, newHours);
                          }}
                        />
                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => removeHour(day, index)}>
                          <Icon name="delete-outline" size={24} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
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
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: colors.borderColor3,
    backgroundColor: colors.whiteColor,
  },
  colorContainer: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorBg: {
    position: 'relative',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  colorObject: {
    width: 40,
    height: 40,
    borderRadius: 99,
  },
  colorActiveCircle: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 99,
    backgroundColor: 'white',
  },
  hourToggle: {
    paddingHorizontal: 16,
    height: 52,
    backgroundColor: colors.bgColor,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addButton: {
    borderRadius: 99,
    padding: 2,
  },
  expandedSection: {
    padding: 16,
    gap: 16,
  },
  timeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deleteButton: {
    backgroundColor: colors.borderColor2,
    borderRadius: 99,
    padding: 8,
  },
});
