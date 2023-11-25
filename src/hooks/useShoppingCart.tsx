import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {clearDiscount} from '@/store/cart';

const useShoppingCart = businessID => {
  const dispatch = useDispatch();
  const {
    items = [],
    totalPrice: initialTotalPrice = 0,
    coupon,
    date,
    user,
  } = useSelector(state => state.cart.carts[businessID] || {});

  const services: Service[] = useMemo(
    () => items.filter(item => item.serviceName),
    [items],
  );
  const products: Product[] = useMemo(
    () => items.filter(item => item.productName),
    [items],
  );

  const uniqueProducts = useMemo(() => {
    const uniqueProductsMap = new Map();

    products.forEach((product: Product) => {
      if (!uniqueProductsMap.has(product._id)) {
        uniqueProductsMap.set(product._id, {product, quantity: 1});
      } else {
        const existingProduct = uniqueProductsMap.get(product._id);
        uniqueProductsMap.set(product._id, {
          product,
          quantity: existingProduct.quantity + 1,
        });
      }
    });

    return Array.from(uniqueProductsMap.values());
  }, [products]);

  const serviceCount: number = services.length;
  const productCount: number = products.length;

  const serviceTotalMinutes = services.reduce(
    (total, service) => total + service.durationMinutes,
    0,
  );

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
    if (coupon) {
      if (coupon.discount.couponValue.type === '%') {
        return (totalPrice * coupon.discount.couponValue.value) / 100;
      } else if (coupon.discount.couponValue.type === 'CHF') {
        return coupon.discount.couponValue.value;
      } else {
        return 0;
      }
    }
    return 0;
  }, [coupon, totalPrice]);

  const totalPriceAfterDiscount = useMemo(() => {
    const priceAfterDiscount = Math.max(0, totalPrice - calculatedDiscount);
    if (coupon && totalPrice < coupon.discount.couponMinValue) {
      dispatch(clearDiscount({businessID}));
    }
    return priceAfterDiscount;
  }, [calculatedDiscount, totalPrice, coupon, dispatch, businessID]);

  return {
    items,
    services,
    products,
    uniqueProducts,
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
      user,
    },
  };
};

export default useShoppingCart;
