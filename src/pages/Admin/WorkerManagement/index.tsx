import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';

import {ListItem, View} from '@/components';
import {useNavigation} from '@/hooks';
import {colors} from '@/utils';

function WorkerManagement(): JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View fullHeight gap={8}>
        <View>
          <ListItem
            label={t('adminWorkerManagement.options.workers')}
            onPress={() => navigation.navigate('AdminWorkers')}
          />
          <ListItem
            label={t('adminWorkerManagement.options.offdays')}
            onPress={() => navigation.navigate('AdminWorkerDayOffs')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default WorkerManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
});
