import i18next from 'i18next';
import * as Yup from 'yup';

const {t} = i18next;

export const registerAndLoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email(() => t('loginAndRegister.form.email.error.invalid'))
    .required(() => t('loginAndRegister.form.email.error.notEmpty')),
  password: Yup.string()
    .min(6, () => t('loginAndRegister.form.password.error.min'))
    .required(() => t('loginAndRegister.form.password.error.notEmpty')),
});

export const updateUserProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email(() => t('loginAndRegister.form.email.error.invalid'))
    .required(() => t('loginAndRegister.form.email.error.notEmpty')),
});
