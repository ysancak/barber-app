import * as Yup from 'yup';

export const registerAndLoginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Geçersiz email adresi').required('Email zorunludur'),
    password: Yup.string().min(6, 'Parola en az 6 karakter olmalıdır').required('Parola zorunludur'),
});