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
import {wp} from '@/utils/responsive';

export default function AdminCalendar() {
  return (
    <CalendarProvider
      date="2024-03-07"
      onDateChanged={console.log}
      onMonthChange={console.log}
      showTodayButton
      collapsable
      theme={{}}>
      <TimelineList
        events={{
          '2024-03-07': [
            {
              id: '1',
              start: '2024-03-07 07:30',
              end: '2024-03-07 08:00',
              title: 'Title',
              summary: 'summary',
              color: 'purple',
            },
          ],
        }}
        showNowIndicator
        scrollToNow
        //renderItem={}
        timelineProps={{
          onBackgroundLongPress(timeString, time) {
            console.log(timeString, time);
          },
          onChangeOffset(offset) {
            console.log(offset);
          },
          onEventPress(event) {
            console.log(event);
          },
          unavailableHours: [{start: 16, end: 17}],
          unavailableHoursColor: colors.borderColor3,
          overlapEventsSpacing: 40,
          styles: {
            contentStyle: {
              backgroundColor: 'red',
            },
          },
          theme: {
            line: {
              color: 'red',
            },
          },
        }}
      />
    </CalendarProvider>
  );
}
