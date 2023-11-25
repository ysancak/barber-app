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
    .email(() => t('editProfile.form.email.error.invalid'))
    .required(() => t('editProfile.form.email.error.notEmpty')),
  name: Yup.string(),
  surname: Yup.string(),
  gsm: Yup.string(),
  password: Yup.string(),
  passwordConfirmation: Yup.string(),
  street: Yup.string(),
  no: Yup.string(),
  postcode: Yup.string(),
  ort: Yup.string(),
});

export const passwordConfirmationSchema = Yup.object().shape({
  password: Yup.string().required(() =>
    t('passwordConfirmation.form.password.error.notEmpty'),
  ),
  passwordConfirmation: Yup.string().required(() =>
    t('passwordConfirmation.form.password.error.notEmpty'),
  ),
});

export const searchValidationSchema = Yup.object().shape({
  gender: Yup.string(),
  category: Yup.string(),
});

export const couponCodeSchema = Yup.object().shape({
  couponCode: Yup.string().required(() => t('couponCode.form.error.notEmpty')),
});

export const orderUserInfoSchema = Yup.object().shape({
  email: Yup.string()
    .email(() => t('orderUserInfo.form.email.error.invalid'))
    .required(() => t('orderUserInfo.form.email.error.notEmpty')),
  name: Yup.string().required(() =>
    t('orderUserInfo.form.name.error.notEmpty'),
  ),
  surname: Yup.string().required(() =>
    t('orderUserInfo.form.surname.error.notEmpty'),
  ),
  gsm: Yup.string().required(() => t('orderUserInfo.form.gsm.error.notEmpty')),
  street: Yup.string().required(() =>
    t('orderUserInfo.form.street.error.notEmpty'),
  ),
  no: Yup.string().required(() => t('orderUserInfo.form.no.error.notEmpty')),
  postcode: Yup.string().required(() =>
    t('orderUserInfo.form.postcode.error.notEmpty'),
  ),
  ort: Yup.string(),
});
