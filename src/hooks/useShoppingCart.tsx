import {useMemo} from 'react';
import {useSelector} from 'react-redux';

const useShoppingCart = (businessID: string) => {
  const businessCart = useSelector(state => state.cart.carts[businessID]);

  const items = useMemo(() => businessCart.items, [businessCart]);

  const services = useMemo(
    () =>
      businessCart ? businessCart.items.filter(item => item.serviceName) : [],
    [businessCart],
  );

  const products = useMemo(
    () =>
      businessCart ? businessCart.items.filter(item => item.productName) : [],
    [businessCart],
  );

  const serviceCount = useMemo(
    () =>
      businessCart
        ? businessCart.items.filter(item => item.serviceName).length
        : 0,
    [businessCart],
  );

  const productCount = useMemo(
    () =>
      businessCart
        ? businessCart.items.filter(item => item.productName).length
        : 0,
    [businessCart],
  );

  const totalPrice = useMemo(() => {
    const calculatedTotalPrice = businessCart
      ? Math.abs(businessCart.totalPrice)
      : 0;
    const _totalPrice = calculatedTotalPrice < 0.01 ? 0 : calculatedTotalPrice;
    return _totalPrice;
  }, [businessCart]);

  const calculateMwstTotals = () => {
    const mwstTotals = new Map();
    let totalMwst = 0;

    businessCart?.items.forEach(item => {
      const currentTotal = mwstTotals.get(item.mwstName) || 0;
      const mwstValue = parseFloat(item.mwstPrice);
      totalMwst += mwstValue;
      mwstTotals.set(item.mwstName, currentTotal + mwstValue);
    });

    return {
      mwstList: Array.from(mwstTotals).map(([name, total]) => ({
        mwstName: name,
        total: total.toFixed(2),
      })),
      totalMwst,
    };
  };

  const {mwstList, totalMwst} = useMemo(calculateMwstTotals, [businessCart]);

  const subtotal = useMemo(() => {
    return totalPrice - totalMwst;
  }, [totalPrice, totalMwst]);

  const calculatedDiscount = useMemo(() => {
    if (businessCart.discount) {
      if (businessCart.discount.type === '%') {
        return (totalPrice * businessCart.discount.value) / 100;
      } else if (businessCart.discount.type === 'CHF') {
        return businessCart.discount.value;
      } else {
        return 0;
      }
    }
    return null;
  }, [businessCart, totalPrice]);

  const totalPriceAfterDiscount = useMemo(() => {
    if (totalPrice - calculatedDiscount <= 0) {
      return 0;
    } else {
      return totalPrice - calculatedDiscount;
    }
  }, [totalPrice, calculatedDiscount]);

  return {
    items,
    services,
    products,
    mwstList,
    calculatedDiscount,
    totalPriceAfterDiscount,
    subtotal,
    totalPrice,
    totalMwst,
    serviceCount,
    productCount,
  };
};

export default useShoppingCart;
