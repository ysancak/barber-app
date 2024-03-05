import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text, View} from '@/components';
import {colors} from '@/utils';

export default function ListItem({_id, name, surname, availability}: Worker) {
  const isAvailable = useMemo(
    () => availability === 'Available',
    [availability],
  );

  return (
    <View style={styles.workerContainer}>
      <View style={styles.workerInfoContainer}>
        <Text variant="title" fontSize={18} numberOfLines={1}>
          {name} {surname}
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
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="edit" size={24} color={colors.textColor} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
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
