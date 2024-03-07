import {t} from 'i18next';
import * as Yup from 'yup';

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
  agb: Yup.boolean()
    .oneOf([true], () => t('orderUserInfo.form.agb.error.notEmpty'))
    .required(() => t('orderUserInfo.form.agb.error.notEmpty')),
});

export const adminLoginValidation = Yup.object().shape({
  username: Yup.string().required(() =>
    t('adminLogin.form.username.error.notEmpty'),
  ),
  password: Yup.string()
    .min(6, () => t('adminLogin.form.password.error.min'))
    .required(() => t('adminLogin.form.password.error.notEmpty')),
});

const daySchema = Yup.array()
  .of(
    Yup.object().shape({
      start: Yup.string().when('offday', (offday: string[], schema) =>
        offday[0] === 'off'
          ? schema.required(() =>
              t('addWorker.form.workHour.startHour.error.notEmpty'),
            )
          : schema,
      ),
      end: Yup.string().when('offday', (offday: string[], schema) =>
        offday[0] === 'off'
          ? schema.required(() =>
              t('addWorker.form.workHour.endHour.error.notEmpty'),
            )
          : schema,
      ),
      offday: Yup.string().oneOf(['off', 'on']),
    }),
  )
  .test(
    'time-overlap',
    () => t('addWorker.form.workHour.error.timeConflict'),
    function (hours) {
      return checkTimeOverlap(hours);
    },
  );

const checkTimeOverlap = hours => {
  const sortedHours = hours
    .filter(hour => hour.offday === 'off')
    .sort((a, b) => {
      const startTimeA = new Date(`2021-01-01T${a.start}:00`).getTime();
      const startTimeB = new Date(`2021-01-01T${b.start}:00`).getTime();
      return startTimeA - startTimeB;
    });

  if (sortedHours.length === 1) {
    const start1 = new Date(`2021-01-01T${sortedHours[0].start}:00`).getTime();
    const end1 = new Date(`2021-01-01T${sortedHours[0].end}:00`).getTime();

    if (start1 > end1) {
      return false;
    }
  }

  for (let i = 0; i < sortedHours.length - 1; i++) {
    const start1 = new Date(`2021-01-01T${sortedHours[i].start}:00`).getTime();
    const end1 = new Date(`2021-01-01T${sortedHours[i].end}:00`).getTime();
    const start2 = new Date(
      `2021-01-01T${sortedHours[i + 1].start}:00`,
    ).getTime();
    const end2 = new Date(`2021-01-01T${sortedHours[i + 1].end}:00`).getTime();
    if (end1 > start2 || end2 <= end1 || start1 > end1 || start2 > end2) {
      return false;
    }
  }
  return true;
};

export const createWorkerSchema = Yup.object().shape({
  name: Yup.string().required(() => t('addWorker.form.name.error.notEmpty')),
  surname: Yup.string().required(() =>
    t('addWorker.form.surname.error.notEmpty'),
  ),
  workerColor: Yup.string(),
  availability: Yup.string().oneOf(['Available', 'Unavailable']),
  hours: Yup.object().shape({
    '0': daySchema,
    '1': daySchema,
    '2': daySchema,
    '3': daySchema,
    '4': daySchema,
    '5': daySchema,
    '6': daySchema,
  }),
});

export const createWorkerDayOffSchema = Yup.object().shape({
  workerID: Yup.string().required(() =>
    t('addDayOff.form.workerID.error.notEmpty'),
  ),
  HolidayStartDate: Yup.string().required(() =>
    t('addDayOff.form.holidayStartDate.error.notEmpty'),
  ),
  HolidayEndDate: Yup.string().required(() =>
    t('addDayOff.form.holidayEndDate.error.notEmpty'),
  ),
});

// TODO: dil dosyasını düzelt
// TODO: endHour startHour dan önce olmaz ve startHour endHour dan sona olamaz
export const createCalendarEventSchema = Yup.object().shape({
  workerID: Yup.string().required(() => 'worker zorunlu'),
  customerName: Yup.string().required(() => 'customerName zorunlu'),
  customerSurname: Yup.string().required(() => 'customerSurname zorunlu'),
  clientTel: Yup.string().required(() => 'clientTel zorunlu'),
  date: Yup.string().required(() => 'date zorunlu'),
  startHour: Yup.string().required(() => 'startHour zorunlu'),
  endHour: Yup.string().required(() => 'endHour zorunlu'),
  orderNote: Yup.string().required(() => 'orderNote zorunlu'),
});
