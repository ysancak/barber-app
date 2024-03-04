import React, {useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Text} from '@/components';
import {useNavigation} from '@/hooks';
import {colors} from '@/utils';

export default function DayOffs() {
  const navigation = useNavigation<AdminStackParamList>();

  const data = [
    {
      id: '1',
      name: 'Onur',
      surname: 'Ceran',
      startDate: '28.2.2024',
      endDate: '1.3.2024',
    },
    {
      id: '2',
      name: 'Max',
      surname: 'Muster',
      startDate: '28.2.2024',
      endDate: '1.3.2024',
    },
  ];

  const HeaderRightComponent = () => (
    <TouchableOpacity onPress={() => navigation.navigate('AddDayOff')}>
      <View style={styles.headerRight}>
        <Icon name="add" size={26} color={colors.primaryColor} />
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRightComponent,
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.scrollView}>
      {data.map((item, index) => (
        <View key={index} style={styles.workerContainer}>
          <View style={styles.workerInfoContainer}>
            <Text variant="title" fontSize={18}>
              {item.name} {item.surname}
            </Text>
            <View style={styles.dateContainer}>
              <Text>{item.startDate}</Text>
              <Icon
                name="keyboard-double-arrow-right"
                size={22}
                color={colors.primaryColor}
              />
              <Text>{item.startDate}</Text>
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
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.bgColor,
  },
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
