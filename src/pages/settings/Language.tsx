import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';

import {Button, RadioListItem} from '@/components';
import {useNavigation} from '@/hooks';
import i18n from '@/locale/i18n.config';
import {colors} from '@/utils';
import {showSuccessToast} from '@/utils/toast';

function LanguageSettings(): JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  navigation.setOptions({
    headerRight() {
      return (
        <Button
          variant="text"
          label={t('general.save')}
          onPress={() => saveLanguage()}
        />
      );
    },
  });

  const changeLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const saveLanguage = () => {
    showSuccessToast(t('languageSettings.toast.savedSuccess'));
  };

  return (
    <ScrollView style={styles.container}>
      <RadioListItem
        label={t('languageSettings.languages.tr')}
        active={selectedLanguage === 'tr'}
        onPress={() => changeLanguage('tr')}
      />
    </ScrollView>
  );
}

export default LanguageSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
});
