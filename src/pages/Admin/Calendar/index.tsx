import 'moment/min/locales';
import {TimelineCalendar, TimelineCalendarHandle} from '@howljs/calendar-kit';
import moment from 'moment';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import theme from './theme';

import {Text, View} from '@/components';
import {useFetch, useNavigation} from '@/hooks';
import {adminGetCelandarEventService} from '@/services/admin.service';
import {setEvents, toggleMode} from '@/store/admin/calendar';
import {colors} from '@/utils';

export default function AdminCalendar() {
  const calendarRef = useRef<TimelineCalendarHandle>();
  const currentHour = new Date().getHours();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [isLoading, setIsLoading] = useState(true);
  const {
    mode,
    numOfDays,
    events,
    unavailableHours,
    holidays,
    startHour,
    endHour,
  } = useSelector(state => state.calendar);
  const {fetch, loading, data} = useFetch(adminGetCelandarEventService);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        calendarRef.current?.goToHour(currentHour - 2, true);
      }, 50);
    }, 50);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRightComponent,
    });
  }, [navigation, mode]);

  useEffect(() => fetchDateEvetns(), [selectedDate, mode]);

  useEffect(() => {
    if (data) {
      dispatch(setEvents(data));
    }
  }, [data]);

  const fetchDateEvetns = () => {
    const fromDate = new Date(selectedDate);
    const toDate = new Date(selectedDate);
    toDate.setDate(toDate.getDate() + numOfDays);
    fetch({
      startDate: moment(fromDate).format('YYYY-MM-DD'),
      endDate: moment(toDate).format('YYYY-MM-DD'),
    });
  };

  const HeaderRightComponent = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity>
        <Icon name="person-outline" size={26} color={colors.primaryColor} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(toggleMode())}>
        <Icon
          name={mode === 'threeDays' ? 'crop-square' : 'width-normal'}
          size={26}
          color={colors.primaryColor}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('AdminAddCalendarEvent')}>
        <Icon name="add" size={26} color={colors.primaryColor} />
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return <View style={styles.container} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TimelineCalendar
        ref={calendarRef}
        locale="de"
        events={events}
        viewMode={mode}
        start={startHour}
        end={endHour}
        holidays={holidays}
        isLoading={loading}
        unavailableHours={unavailableHours}
        theme={theme}
        allowPinchToZoom
        useHaptic
        scrollToNow
        initialTimeIntervalHeight={100}
        minTimeIntervalHeight={100}
        maxTimeIntervalHeight={300}
        showNowIndicator
        spaceFromTop={10}
        spaceFromBottom={2}
        onDateChanged={date => setSelectedDate(date)}
        onPressBackground={date =>
          navigation.navigate('AdminAddCalendarEvent', {date})
        }
        onPressEvent={eventItem => console.log('onPressEvent', eventItem.title)}
        onLongPressEvent={eventItem =>
          console.log('onLongPressEvent', eventItem.title)
        }
        renderEventContent={event => (
          <View style={styles.eventContentContainer}>
            <Text bold color={colors.textColor} fontSize={14}>
              {event.title}
            </Text>
            <Text color={colors.textColor} fontSize={14}>
              {event.worker.name}
            </Text>
            <Text color={colors.textColor} fontSize={13}>
              {`${moment(event.start).format('HH:mm')} - ${moment(
                event.end,
              ).format('HH:mm')}`}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteColor,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
  },
  eventContentContainer: {
    gap: 8,
    padding: 5,
    shadowOffset: {width: 1, height: 2},
    shadowColor: 'white',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
