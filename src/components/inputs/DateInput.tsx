import moment from 'moment';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Text from '../Text';
import View from '../View';

import {colors} from '@/utils';

interface IDateInput {
  placeholder: string;
  onChange?: (date: string | Date) => void; // Now accepts both Date and string for time mode
  date?: Date | string; // Can be a Date object or a string for time mode
  error?: string;
  mode?: 'date' | 'datetime' | 'time';
  disabled?: boolean;
  style?: ViewStyle;
  dateFormat?: string;
  maximumDate?: Date | undefined;
  minimumDate?: Date | undefined;
}

const DateInput: React.FC<IDateInput> = ({
  placeholder,
  onChange = () => {},
  date,
  error,
  mode = 'date',
  disabled = false,
  style,
  dateFormat,
  maximumDate,
  minimumDate,
}) => {
  const [open, setOpen] = useState(false);
  const {t} = useTranslation();

  const onPress = () => {
    if (disabled) {
      return;
    }
    setOpen(true);
  };

  const formatDisplay = (
    date: Date | string,
    mode: 'date' | 'datetime' | 'time',
    dateFormat?: string,
  ) => {
    if (mode === 'time' && typeof date === 'string') {
      return date;
    } else if (date instanceof Date) {
      switch (mode) {
        case 'datetime':
          return moment(date).format(dateFormat || 'DD/MM/YYYY HH:mm');
        case 'date':
          return moment(date).format(dateFormat || 'DD/MM/YYYY');
        case 'time':
          return moment(date).format(dateFormat || 'HH:mm');
        default:
          return '';
      }
    }
    return '';
  };

  const handleConfirm = (date: Date) => {
    if (mode === 'time') {
      onChange(moment(date).format('HH:mm'));
    } else {
      onChange(date);
    }
    setOpen(false);
  };

  const getDateForPicker = () => {
    if (mode === 'time' && typeof date === 'string' && date !== '') {
      const [hours, minutes] = date.split(':').map(Number);
      const dateObj = new Date();
      dateObj.setHours(hours, minutes);
      return dateObj;
    } else if (date instanceof Date) {
      return date;
    }
    return new Date();
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          style={[styles.button, error && styles.error, style]}>
          <Icon name="calendar-today" size={22} color={colors.primaryColor} />
          {date ? (
            <Text fontSize={14}>{formatDisplay(date, mode, dateFormat)}</Text>
          ) : (
            <Text color={colors.captionTextColor}>{placeholder}</Text>
          )}
        </TouchableOpacity>
        {error && (
          <View flexDirection="row" alignItems="center" gap={2} paddingTop={6}>
            <Icon name="error" size={22} color={colors.errorColor} />
            <Text
              style={{flex: 1}}
              numberOfLines={1}
              color={colors.errorColor}
              fontSize={14}>
              {error}
            </Text>
          </View>
        )}
      </View>
      <DatePicker
        modal
        open={open}
        date={getDateForPicker()}
        onConfirm={handleConfirm}
        onCancel={() => {
          setOpen(false);
        }}
        title={t('dateInput.title')}
        cancelText={t('dateInput.cancelText')!}
        confirmText={t('dateInput.confirmText')!}
        mode={mode}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
      />
    </>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    borderColor: colors.errorColor,
  },
  button: {
    width: '100%',
    borderWidth: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderColor: colors.borderColor,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
