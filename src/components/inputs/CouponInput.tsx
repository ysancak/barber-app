import {useFormik} from 'formik';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {Input, Button, View} from '@/components';
import {useFetch, useShoppingCart} from '@/hooks';
import {couponCodeSchema} from '@/schemas/validations';
import {checkCouponCodeService} from '@/services/common.service';
import {applyDiscount} from '@/store/cart';
import {showSuccessToast} from '@/utils/toast';

type Props = {
  businessID: string;
};

const CouponInput: React.FC<Props> = ({businessID}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const cart = useShoppingCart(businessID);
  const {fetch, data, loading} = useFetch(checkCouponCodeService);

  const formik = useFormik({
    initialValues: {
      couponCode: '',
    },
    validationSchema: couponCodeSchema,
    onSubmit: async values => {
      await fetch({couponCode: values.couponCode, businessID});
    },
  });

  useEffect(() => {
    if (data?.couponValue && cart.totalPrice >= data?.couponMinValue) {
      showSuccessToast('Kupon kodu');
      dispatch(applyDiscount({businessID, discount: data}));
      formik.resetForm();
    }
  }, [data]);

  return (
    <View flexDirection="row" gap={10}>
      <View flex>
        <Input.Text
          icon="savings"
          placeholder={t('couponCode.form.placeholder')}
          onChange={formik.handleChange('couponCode')}
          onBlur={() => formik.handleBlur('couponCode')}
          editable={true}
          value={formik.values.couponCode}
          error={formik.touched.couponCode && formik.errors.couponCode}
        />
      </View>
      <Button
        loading={loading}
        disabled={loading}
        variant="secondary"
        label="Uygula"
        onPress={formik.submitForm}
      />
    </View>
  );
};

export default CouponInput;

const styles = StyleSheet.create({});
