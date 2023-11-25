import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {clearDiscount} from '@/store/cart';

const useShoppingCart = businessID => {
  const dispatch = useDispatch();
  const {
    items = [],
    totalPrice: initialTotalPrice = 0,
    discount,
    date,
  } = useSelector(state => state.cart.carts[businessID] || {});

  const services: Service[] = useMemo(
    () => items.filter(item => item.serviceName),
    [items],
  );
  const products: Product[] = useMemo(
    () => items.filter(item => item.productName),
    [items],
  );

  const serviceCount: number = services.length;
  const productCount: number = products.length;

  // ::TODO
  //const serviceTotalMinutes = services.reduce((total, service) => total + service.durationMinutes, 0);
  const serviceTotalMinutes = 10;

  const mwstDetails = useMemo(() => {
    const mwstTotals = new Map();
    let totalMwst = 0;

    items.forEach(item => {
      const mwstValue = parseFloat(item.mwstPrice || 0);
      totalMwst += mwstValue;
      const currentTotal = mwstTotals.get(item.mwstName) || 0;
      mwstTotals.set(item.mwstName, currentTotal + mwstValue);
    });

    return {
      mwstList: Array.from(mwstTotals).map(([name, total]) => ({
        mwstName: name,
        total: total.toFixed(2),
      })),
      totalMwst,
    };
  }, [items]);

  const {mwstList, totalMwst} = mwstDetails;

  const subtotal: number = useMemo(
    () => initialTotalPrice - totalMwst,
    [initialTotalPrice, totalMwst],
  );

  const totalPrice: number = useMemo(() => {
    return Math.max(0, initialTotalPrice);
  }, [initialTotalPrice]);

  const calculatedDiscount: number = useMemo(() => {
    if (discount) {
      if (discount.couponValue.type === '%') {
        return (totalPrice * discount.couponValue.value) / 100;
      } else if (discount.couponValue.type === 'CHF') {
        return discount.couponValue.value;
      } else {
        return 0;
      }
    }
    return 0;
  }, [discount, totalPrice]);

  const totalPriceAfterDiscount = useMemo(() => {
    const priceAfterDiscount = Math.max(0, totalPrice - calculatedDiscount);
    if (discount && totalPrice < discount.couponMinValue) {
      dispatch(clearDiscount({businessID}));
    }
    return priceAfterDiscount;
  }, [calculatedDiscount, totalPrice, discount, dispatch, businessID]);

  return {
    items,
    services,
    products,
    mwstList,
    discount: calculatedDiscount,
    totalPrice,
    totalPriceAfterDiscount,
    subtotal,
    serviceCount,
    productCount,
    serviceTotalMinutes,
    detail: {
      date,
    },
  };
};

export default useShoppingCart;
