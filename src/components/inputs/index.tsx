import AddressInput from '@/components/inputs/AddressInput';
import CouponInput from '@/components/inputs/CouponInput';
import DateInput from '@/components/inputs/DateInput';
import GenderInput from '@/components/inputs/GenderInput';
import PasswordInput from '@/components/inputs/PasswordInput';
import SelectInput from '@/components/inputs/SelectInput';
import Switch from '@/components/inputs/Switch';
import TextInput from '@/components/inputs/TextInput';

const Input = {
  Text: TextInput,
  Password: PasswordInput,
  Select: SelectInput,
  Address: AddressInput,
  Gender: GenderInput,
  Coupon: CouponInput,
  Date: DateInput,
  Switch: Switch,
};

export default Input;
