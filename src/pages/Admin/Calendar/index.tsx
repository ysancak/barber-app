import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Agenda,
  Calendar,
  CalendarProvider,
  ExpandableCalendar,
  Timeline,
  TimelineList,
} from 'react-native-calendars';

import {Text, View} from '@/components';
import {colors} from '@/utils';

export default function AdminCalendar() {
  return (
    <CalendarProvider
      date={'2024-03-06'}
      onDateChanged={console.log}
      onMonthChange={console.log}
      showTodayButton
      numberOfDays={1}
      timelineLeftInset={50}>
      <ExpandableCalendar
        date={'2024-03-06'}
        markedDates={{
          '2024-03-06': {marked: true},
        }}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: colors.textColor,
          textSectionTitleDisabledColor: colors.captionTextColor,
          selectedDayBackgroundColor: colors.primaryColor,
          selectedDotColor: '#ffffff',
          selectedDayTextColor: '#ffffff',
          todayTextColor: colors.primaryColor,
          dayTextColor: colors.textColor,
          textDisabledColor: colors.captionTextColor,
          dotColor: colors.primaryColor,
          arrowColor: colors.textColor,
          monthTextColor: colors.textColor,
          indicatorColor: colors.primaryColor,
          textDayFontFamily: 'EncodeSans-Bold',
          textMonthFontFamily: 'EncodeSans-Bold',
          textDayHeaderFontFamily: 'EncodeSans-Bold',
          textDayFontWeight: 'bold',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '500',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 15,
        }}
        canCancelContentTouches
        enableSwipeMonths={false}
        allowShadow
        disablePan
        hideKnob
      />
      <TimelineList
        events={{
          '2024-03-06': [
            {
              id: '1',
              title: 'Başlık',
              summary: 'açıklama',
              start: '2024-03-06 16:00',
              end: '2024-03-06 17:00',
              color: 'orange',
            },
          ],
        }}
        timelineProps={{
          unavailableHours: [{start: 5, end: 8}],
          unavailableHoursColor: colors.borderColor3,
          format24h: true,
          start: 0,
          end: 24,
          overlapEventsSpacing: 6,
          rightEdgeSpacing: 8,
        }}
        showNowIndicator={true}
        scrollToNow={true}
      />
    </CalendarProvider>
  );
}
