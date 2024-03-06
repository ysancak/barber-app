import moment from 'moment';
import 'moment/min/locales';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';

import {Text, View} from '@/components';
import {showAlert} from '@/components/Alert';
import {useNavigation} from '@/hooks';
import {adminDeleteDayOffService} from '@/services/admin.service';
import {deleteUpcomingDayOff} from '@/store/admin/dayoffs';
import {colors} from '@/utils';

type Props = {
  editable?: boolean;
  deletable?: boolean;
};

export default function ListItem({
  editable = true,
  deletable = true,
  ...props
}: Props & WorkerDayOff) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const startDate = moment(props.HolidayStartDate);
  const endDate = moment(props.HolidayEndDate);
  const now = moment();

  const isStarted = useMemo(() => now.isAfter(startDate), [startDate]);

  const message = useMemo(
    () =>
      now.isBefore(startDate) && startDate.diff(now, 'hours') < 48
        ? t('adminDayOffs.upcomingMessage.start', {
            days: startDate.diff(now, 'hours'),
          })
        : now.isAfter(startDate) &&
          now.isBefore(endDate) &&
          endDate.diff(now, 'hours') < 48
        ? t('adminDayOffs.upcomingMessage.end', {
            days: endDate.diff(now, 'hours'),
          })
        : '',
    [startDate, endDate, now],
  );

  const deleteHandler = () => {
    try {
      dispatch(deleteUpcomingDayOff(props._id));
      adminDeleteDayOffService(props._id);
    } catch (error) {}
  };

  const onDelete = () => {
    showAlert({
      title: t('alert.delete.title'),
      content: t('alert.delete.description'),
      buttons: [
        {
          type: 'default',
          text: t('alert.delete.actions.delete'),
          onPress: () => deleteHandler(),
        },
        {
          type: 'secondary',
          text: t('alert.delete.actions.cancel'),
        },
      ],
    });
  };

  return (
    <View style={styles.workerContainer}>
      <View style={styles.workerInfoContainer}>
        <Text variant="title" fontSize={18}>
          {props.workerName}
        </Text>
        <View style={styles.dateContainer}>
          <Text>{startDate.format('DD.MM.YYYY')}</Text>
          <Icon
            name="keyboard-double-arrow-right"
            size={22}
            color={colors.primaryColor}
          />
          <Text>{endDate.format('DD.MM.YYYY')}</Text>
        </View>
        {message && (
          <View>
            <Text variant="caption">{message}</Text>
          </View>
        )}
      </View>
      <View style={styles.actionButtonsContainer}>
        {editable && !isStarted && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('AdminEditDayOff', props)}>
            <Icon name="edit" size={24} color={colors.textColor} />
          </TouchableOpacity>
        )}

        {deletable && (
          <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
            <Icon name="delete-outline" size={24} color={colors.textColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  workerContainer: {
    padding: 16,
    backgroundColor: colors.whiteColor,
    borderBottomWidth: 1,
    borderColor: colors.borderColor3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workerInfoContainer: {
    gap: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.borderColor2,
    borderRadius: 99,
  },
  headerRight: {
    paddingHorizontal: 16,
  },
});
