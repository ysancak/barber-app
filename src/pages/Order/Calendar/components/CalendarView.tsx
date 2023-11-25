import moment from 'moment';
import 'moment/min/locales';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';

import {
  View,
  Text,
  RadioListItem,
  EmptyPage,
  SkeletonLoading,
  ErrorResult,
} from '@/components';
import {useFetch, useShoppingCart} from '@/hooks';
import {getWorkerCalendarEvents} from '@/services/saloon.service';
import {resetCartDate, setCartDate} from '@/store/cart';
import {colors} from '@/utils';

type Props = {
  businessID: string;
  workerID: string;
};

const CalendarView: React.FC<Props> = ({businessID, workerID}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const workerEventFetch = useFetch(getWorkerCalendarEvents);
  const cart = useShoppingCart(businessID);

  const [selectedDate, setSelectedDate] = useState(moment());
  const [openedHour, setOpenedHour] = useState<string | null>(null);
  const timeFrequency = 15;
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dayOfWeek = useMemo(() => (selectedDate.day() + 6) % 7, [selectedDate]);
  const currentShift = useMemo(() => {
    const shifts = workerEventFetch?.data?.hours;
    return shifts ? shifts[dayOfWeek] : null;
  }, [workerEventFetch.data, dayOfWeek]);

  useEffect(() => {
    moment.locale(i18n.language);
    setOpenedHour(moment().format('HH'));
  }, [i18n.language]);

  useEffect(() => {
    workerEventFetch.fetch({
      businessID,
      workerID,
      startDate: selectedDate.format('YYYY-MM-DD'),
    });
    setSelectedTime(null);
    dispatch(resetCartDate({businessID}));
  }, [selectedDate, workerID]);

  const previousDay = () => {
    let newDate = moment(selectedDate).subtract(1, 'days');
    if (newDate.isSameOrAfter(moment(), 'day')) {
      setSelectedDate(newDate);
    }
  };

  const nextDay = () => {
    let newDate = moment(selectedDate).add(1, 'days');
    let maxDate = moment().add(30, 'days');
    if (newDate.isSameOrBefore(maxDate, 'day')) {
      setSelectedDate(newDate);
    }
  };

  const generateTimeSlots = useCallback(
    hour => {
      if (!currentShift || currentShift?.offday === 'on') {
        return [];
      }

      const currentTime = moment(selectedDate).hour(hour).minute(0);
      const untilEnd = currentTime.clone().add(1, 'hour');
      const shiftEndTime = moment(selectedDate).set({
        hour: moment(currentShift.end, 'HH:mm').hour(),
        minute: moment(currentShift.end, 'HH:mm').minute(),
      });

      const processedEvents = workerEventFetch?.data?.events.map(event => ({
        start: moment(event.start),
        end: moment(event.end),
      }));

      let slots = [];
      while (currentTime.isBefore(untilEnd)) {
        const formattedTime = currentTime.format('HH:mm');
        const serviceEndTime = currentTime
          .clone()
          .add(cart.serviceTotalMinutes, 'minute');
        let isTimeSlotAvailable = processedEvents.every(
          event =>
            !currentTime.isBetween(event.start, event.end, null, '[]') &&
            !serviceEndTime.isBetween(event.start, event.end, null, '[]') &&
            !(
              event.start.isAfter(currentTime) &&
              event.start.isBefore(serviceEndTime)
            ),
        );

        if (
          isTimeSlotAvailable &&
          serviceEndTime.isSameOrBefore(shiftEndTime) &&
          (!moment(selectedDate).isSame(moment(), 'day') ||
            currentTime.isSameOrAfter(moment()))
        ) {
          slots.push(formattedTime);
        }

        currentTime.add(timeFrequency, 'minutes');
      }

      return slots;
    },
    [
      currentShift,
      selectedDate,
      workerEventFetch.data,
      cart.serviceTotalMinutes,
      timeFrequency,
    ],
  );

  const generatedHours = useMemo(() => {
    if (!currentShift || currentShift?.offday === 'on') {
      return [];
    }

    let startHour = parseInt(
      moment(currentShift?.start, 'HH:mm').format('HH'),
      10,
    );
    const endHour = parseInt(
      moment(currentShift?.end, 'HH:mm').format('HH'),
      10,
    );
    if (selectedDate.isSame(moment(), 'day') && moment().hour() > startHour) {
      startHour = moment().hour();
    }

    return Array.from({length: endHour - startHour}, (_, i) => startHour + i)
      .filter(hour => generateTimeSlots(hour).length > 0)
      .map(hour => hour.toString().padStart(2, '0'));
  }, [currentShift, selectedDate, generateTimeSlots]);

  const toggleHour = (hour: string) => {
    setOpenedHour(openedHour === hour ? null : hour);
  };

  const onTimeSelect = (time: string) => {
    setSelectedTime(time);
    const dateTime = moment(selectedDate).format('YYYY-MM-DD') + ' ' + time;
    const fullDateStart = moment(dateTime, 'YYYY-MM-DD HH:mm');
    const fullDateEnd = moment(dateTime, 'YYYY-MM-DD HH:mm').add(
      cart.serviceTotalMinutes,
      'minute',
    );
    dispatch(
      setCartDate({
        businessID,
        workerID,
        date: {
          start: fullDateStart.toISOString(),
          end: fullDateEnd.toISOString(),
        },
      }),
    );
  };

  const renderContent = useMemo(() => {
    if (workerEventFetch.loading) {
      return <SkeletonLoading.Calendar />;
    }

    if (workerEventFetch.error) {
      return <ErrorResult onPress={workerEventFetch.retry} />;
    }

    if (generatedHours.length <= 0) {
      return (
        <EmptyPage
          animation="empty"
          title={t('calendar.error.slotNotFound.title')}
          description={t('calendar.error.slotNotFound.description')}
        />
      );
    }

    return (
      <ScrollView style={styles.scrollView}>
        {generatedHours.map((hour, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.hourToggle}
              onPress={() => toggleHour(hour.toString())}>
              <Text variant="title" fontSize={16}>
                {hour}:00
              </Text>
              <Icon
                name={
                  openedHour === hour.toString() ? 'expand-less' : 'expand-more'
                }
                size={30}
              />
            </TouchableOpacity>

            {openedHour === hour.toString() &&
              generateTimeSlots(hour).map((time, idx) => (
                <RadioListItem
                  key={idx}
                  label={time}
                  active={selectedTime === time}
                  onPress={() => onTimeSelect(time)}
                />
              ))}
          </View>
        ))}
      </ScrollView>
    );
  }, [
    workerEventFetch.data,
    workerEventFetch.loading,
    workerEventFetch.error,
    generatedHours,
    generateTimeSlots,
    openedHour,
    selectedTime,
  ]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <View style={{width: 30}}>
          {selectedDate.isAfter(moment(), 'day') && (
            <TouchableOpacity
              hitSlop={20}
              disabled={workerEventFetch.loading}
              onPress={previousDay}
              style={{alignItems: 'flex-start'}}>
              <Icon
                name="chevron-left"
                size={30}
                color={colors.secondaryColor}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.dateDisplay}>
          <Text semibold fontSize={18}>
            {selectedDate.format('LL')}
          </Text>
        </View>

        <View style={{width: 30}}>
          {selectedDate.isBefore(moment().add(30, 'days'), 'day') && (
            <TouchableOpacity
              hitSlop={20}
              disabled={workerEventFetch.loading}
              onPress={nextDay}
              style={{alignItems: 'flex-end'}}>
              <Icon
                name="chevron-right"
                size={30}
                color={colors.secondaryColor}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {renderContent}
    </View>
  );
};

export default CalendarView;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
    backgroundColor: colors.whiteColor,
  },
  dateDisplay: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: colors.bgColor,
  },
  hourToggle: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.bgColor,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeSlot: {
    backgroundColor: colors.whiteColor,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
  },
});
