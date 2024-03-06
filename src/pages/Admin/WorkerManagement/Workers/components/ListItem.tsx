import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';

import {Text, View} from '@/components';
import {showAlert} from '@/components/Alert';
import {useNavigation} from '@/hooks';
import {adminDeleteWorkerService} from '@/services/admin.service';
import {deleteWorker} from '@/store/admin/workers';
import {colors} from '@/utils';

export default function ListItem(worker: Worker) {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isAvailable = useMemo(
    () => worker.availability === 'Available',
    [worker.availability],
  );

  const deleteHandler = () => {
    try {
      dispatch(deleteWorker(worker._id));
      adminDeleteWorkerService(worker._id);
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
        <Text variant="title" fontSize={18} numberOfLines={1}>
          {worker.name} {worker.surname}
        </Text>
        <View style={styles.workerStatusContainer}>
          <View
            style={{
              ...styles.statusIndicator,
              backgroundColor: isAvailable
                ? colors.successColor
                : colors.errorColor,
            }}
          />
          <Text>{isAvailable ? 'Çalışıyor' : 'Uygun değil'}</Text>
        </View>
      </View>
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('AdminEditWorker', worker)}>
          <Icon name="edit" size={24} color={colors.textColor} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
          <Icon name="delete-outline" size={24} color={colors.textColor} />
        </TouchableOpacity>
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
    gap: 20,
  },
  workerInfoContainer: {
    gap: 8,
    flex: 1,
  },
  workerStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 99,
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
});
