import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';

import {Text, View} from '@/components';
import {showAlert} from '@/components/Alert';
import {adminDeleteCalendarEventService} from '@/services/admin.service';
import {deleteEvent} from '@/store/admin/calendar';
import {colors} from '@/utils';

type Props = {
  payload: {
    event: CalendarEvent;
    navigation: any;
  };
  sheetId: string;
};
export default function EventActionModal({payload, sheetId}: Props) {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const onEventDeleteHandler = () => {
    try {
      dispatch(deleteEvent(payload.event.id));
      adminDeleteCalendarEventService(payload.event.id);
    } catch (error) {}
  };

  const onEventDeletePress = () => {
    SheetManager.hide('admin_calendar_event_action');
    showAlert({
      title: t('alert.delete.title'),
      content: t('alert.delete.description'),
      buttons: [
        {
          type: 'default',
          text: t('alert.delete.actions.delete'),
          onPress: onEventDeleteHandler,
        },
        {
          type: 'secondary',
          text: t('alert.delete.actions.cancel'),
        },
      ],
    });
  };

  const onEventEditPress = () => {
    SheetManager.hide('admin_calendar_event_action');
    payload.navigation.navigate('AdminEditCalendarEvent', payload.event);
  };

  return (
    <ActionSheet id={sheetId} useBottomSafeAreaPadding>
      <View style={{paddingBottom: 40}}>
        <View style={styles.actionSheetHeader}>
          <Text variant="title" fontSize={18}>
            {t('adminCalendar.eventModal.title')}
          </Text>
        </View>
        <View style={{gap: 10}}>
          <TouchableOpacity
            style={styles.actionSheetItem}
            onPress={onEventEditPress}>
            <Icon name="edit" size={26} />
            <Text>{t('adminCalendar.eventModal.actions.edit')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionSheetItem}
            onPress={onEventDeletePress}>
            <Icon name="delete-outline" size={26} />
            <Text>{t('adminCalendar.eventModal.actions.delete')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  actionSheetHeader: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionSheetItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
});
