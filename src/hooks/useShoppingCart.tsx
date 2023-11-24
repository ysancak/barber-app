import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {clearDiscount} from '@/store/cart';

const useShoppingCart = businessID => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.carts[businessID] || {});

  const {items = [], totalPrice: initialTotalPrice = 0, discount} = cart;

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
      dispatch(clearDiscount({businessId: businessID}));
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
  };
};

export default useShoppingCart;
