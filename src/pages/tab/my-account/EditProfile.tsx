import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';

import {Button, Input} from '@/components';
import {useNavigation} from '@/hooks/useNavigation';
import {updateUserProfileSchema} from '@/schemas/validations';
import {updateUserProfile, userMeService} from '@/services/account.service';
import {colors} from '@/utils';
import {showSuccessToast} from '@/utils/toast';

function EditProfile(): JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation();

  useEffect(() => {
    getUserDetail();
  }, []);

  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {email: ''},
    validationSchema: updateUserProfileSchema,
    onSubmit: async values => {
      setLoading(true);
      try {
        const result = await updateUserProfile(values);
        if (result) {
          showSuccessToast(t('editProfile.toast.savedSuccess'));
        }
      } finally {
        setLoading(false);
      }
    },
  });

  navigation.setOptions({
    headerRight() {
      return (
        <Button
          variant="text"
          label={t('general.save')}
          disabled={loading}
          onPress={formik.submitForm}
        />
      );
    },
  });

  const getUserDetail = async () => {
    setLoading(true);
    try {
      const result = await userMeService();
      formik.setValues({
        email: result?.email ?? '',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Input.Text
        icon="email"
        placeholder={t('loginAndRegister.form.email.placeholder')}
        keyboardType="email-address"
        onChange={formik.handleChange('email')}
        onBlur={() => formik.handleBlur('email')}
        value={formik.values.email}
        error={formik.touched.email && formik.errors.email}
      />
    </ScrollView>
  );
}

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
