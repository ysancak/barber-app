import moment from 'moment';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text, View} from '@/components';
import {useNavigation} from '@/hooks';
import {colors} from '@/utils';
import {wp} from '@/utils/responsive';

export default function ListItem(props: Order & {deletable: boolean}) {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const start = moment(props.startDate);
  const now = moment();

  const message = useMemo(
    () =>
      now.isBefore(props.startDate) && start.diff(now, 'hours') < 48
        ? t('adminDayOffs.upcomingMessage.start', {
            days: start.diff(now, 'hours'),
          })
        : moment(start).format('DD-MM-YYYY'),
    [start, now],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('MyOrderDetail', {
          order: props,
          deletable: props.deletable,
        })
      }
      style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.noteContainer}>
          <Text
            variant="title"
            fontSize={18}
            numberOfLines={1}
            ellipsizeMode="tail">
            {props.note}
          </Text>
          <View style={styles.businessAndScheduleContainer}>
            <Text
              variant="caption"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.businessNameText}>
              {props.business.businessName}
            </Text>
            <View style={styles.scheduleContainer}>
              <Icon name="schedule" size={20} />
              <Text fontSize={15} numberOfLines={1} ellipsizeMode="tail">
                {props.duration} min.
              </Text>
            </View>
            <View style={styles.calendarContainer}>
              <Icon name="calendar-month" size={20} />
              <Text
                fontSize={15}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{flex: 1}}>
                {message}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Icon name="chevron-right" size={22} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.whiteColor,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  noteContainer: {
    flex: 1,
    gap: 10,
  },
  businessAndScheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  businessNameText: {
    marginRight: 12,
    maxWidth: wp(25),
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    gap: 4,
  },
  calendarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 4,
  },
});
