import i18next from 'i18next';
import moment from 'moment';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import 'moment/min/locales';

import {
  View,
  Text,
  RadioListItem,
  EmptyPage,
  SkeletonLoading,
  ErrorResult,
} from '@/components';
import {useFetch} from '@/hooks';
import {getWorkerCalendarEvents} from '@/services/saloon.service';
import {colors} from '@/utils';

type Props = {
  businessID: string;
  workerID: string;
};

const CalendarView: React.FC<Props> = ({businessID, workerID}) => {
  const workerEventFetch = useFetch(getWorkerCalendarEvents);

  const [selectedDate, setSelectedDate] = useState(moment());
  const [openedHour, setOpenedHour] = useState<string | null>(null);
  const timeFrequency = 15;
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const events = [
    {start: '2023-11-25 13:20', end: '2023-11-25 14:00'},
    {start: '2023-11-25 14:30', end: '2023-11-25 15:00'},
    {start: '2023-11-26 06:23', end: '2023-11-26 06:33'},
  ];
  const selectedServiceLength = 45;

  const dayOfWeek = useMemo(() => (selectedDate.day() + 6) % 7, [selectedDate]);
  const currentShift = useMemo(() => {
    const shifts = workerEventFetch?.data?.hours;
    return shifts ? shifts[dayOfWeek] : null;
  }, [workerEventFetch.data, dayOfWeek]);

  useEffect(() => {
    setSelectedTime(null);
    setOpenedHour(null);
  }, [workerID]);

  useEffect(() => {
    workerEventFetch.fetch({
      businessID,
      workerID,
      startDate: selectedDate.format('YYYY-mm-dd'),
    });
  }, [selectedDate]);

  useEffect(() => {
    setSelectedDate(moment());
  }, [workerID]);

  useEffect(() => {
    moment.locale(i18next.language);
    setOpenedHour(moment().format('HH'));
  }, []);

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

      let currentTime = moment(selectedDate).hour(hour).minute(0);
      let untilEnd = moment(currentTime).add(1, 'hour');
      let slots = [];

      let shiftEndTime = moment(selectedDate);
      shiftEndTime.hour(moment(currentShift.end, 'HH:mm').hour());
      shiftEndTime.minute(moment(currentShift.end, 'HH:mm').minute());

      const processedEvents = events.map(event => ({
        start: moment(event.start),
        end: moment(event.end),
      }));

      // Eğer selectedDate bugünün tarihiyse, şu anki zamandan önce olan slotları döndürme
      const now = moment();
      if (moment(selectedDate).isSame(now, 'day')) {
        while (currentTime.isBefore(untilEnd)) {
          const formattedTime = currentTime.format('HH:mm');
          const serviceEndTime = currentTime
            .clone()
            .add(selectedServiceLength, 'minute');

          let isTimeSlotAvailable = !processedEvents.some(
            event =>
              currentTime.isBetween(event.start, event.end, null, '[]') ||
              serviceEndTime.isBetween(event.start, event.end, null, '[]') ||
              (event.start.isAfter(currentTime) &&
                event.start.isBefore(serviceEndTime)),
          );

          if (
            isTimeSlotAvailable &&
            serviceEndTime.isSameOrBefore(shiftEndTime) &&
            currentTime.isSameOrAfter(now)
          ) {
            slots.push(formattedTime);
          }

          currentTime.add(timeFrequency, 'minutes');
        }
      } else {
        // selectedDate bugünün tarihi değilse, normal slot oluşturma işlemini yap
        while (currentTime.isBefore(untilEnd)) {
          const formattedTime = currentTime.format('HH:mm');
          const serviceEndTime = currentTime
            .clone()
            .add(selectedServiceLength, 'minute');

          let isTimeSlotAvailable = !processedEvents.some(
            event =>
              currentTime.isBetween(event.start, event.end, null, '[]') ||
              serviceEndTime.isBetween(event.start, event.end, null, '[]') ||
              (event.start.isAfter(currentTime) &&
                event.start.isBefore(serviceEndTime)),
          );

          if (
            isTimeSlotAvailable &&
            serviceEndTime.isSameOrBefore(shiftEndTime)
          ) {
            slots.push(formattedTime);
          }

          currentTime.add(timeFrequency, 'minutes');
        }
      }

      return slots;
    },
    [currentShift, selectedDate, events],
  );

  const generateHours = () => {
    if (!currentShift || currentShift?.offday === 'on') {
      return [];
    }

    let startHourInt = parseInt(
      moment(currentShift?.start, 'HH:mm').format('HH'),
      10,
    );
    const endHourInt = parseInt(
      moment(currentShift?.end, 'HH:mm').format('HH'),
      10,
    );
    const hours = [];
    if (
      selectedDate.isSame(moment(), 'day') &&
      moment().hour() > startHourInt
    ) {
      startHourInt = moment().hour();
    }
    for (
      let currentHour = startHourInt;
      currentHour < endHourInt;
      currentHour++
    ) {
      const slots = generateTimeSlots(currentHour);
      if (slots.length > 0) {
        hours.push(moment().hour(currentHour).format('HH'));
      }
    }
    return hours;
  };

  const toggleHour = (hour: string) => {
    setOpenedHour(openedHour === hour ? null : hour);
  };

  const onTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const renderContent = useMemo(() => {
    if (workerEventFetch.loading) {
      return <SkeletonLoading.Calendar />;
    }

    if (workerEventFetch.error) {
      return <ErrorResult onPress={workerEventFetch.retry} />;
    }

    if (generateHours().length <= 0) {
      return (
        <EmptyPage
          animation="empty"
          title="Uygun saat bulunamadı"
          description="Bu çalışan için bu tarihte uygun saat bulunmuyor"
        />
      );
    }

    return (
      <ScrollView style={styles.scrollView}>
        {generateHours().map((hour, index) => (
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
    generateHours,
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
