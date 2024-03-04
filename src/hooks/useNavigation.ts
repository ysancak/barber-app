import {
  ParamListBase,
  useNavigation as useBaseNavigation,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

function useNavigation<T extends ParamListBase>() {
  return useBaseNavigation<StackNavigationProp<T>>();
}

export default useNavigation;
