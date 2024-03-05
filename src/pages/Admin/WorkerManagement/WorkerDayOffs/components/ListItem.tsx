import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text, View} from '@/components';
import {colors} from '@/utils';

export default function ListItem({
  id,
  name,
  surname,
  startDate,
  endDate,
}: WorkerDayOff) {
  return (
    <View style={styles.workerContainer}>
      <View style={styles.workerInfoContainer}>
        <Text variant="title" fontSize={18}>
          {name} {surname}
        </Text>
        <View style={styles.dateContainer}>
          <Text>{startDate}</Text>
          <Icon
            name="keyboard-double-arrow-right"
            size={22}
            color={colors.primaryColor}
          />
          <Text>{endDate}</Text>
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
