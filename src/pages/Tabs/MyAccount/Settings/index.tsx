import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';

import {ListItem, View} from '@/components';
import {useNavigation} from '@/hooks';
import {colors} from '@/utils';

function Settings(): JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View fullHeight gap={8}>
        <View>
          <ListItem
            label={t('languageSettings.title')}
            onPress={() => navigation.navigate('LanguageSettings')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
});
