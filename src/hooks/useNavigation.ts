import {useNavigation as useBaseNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

function useNavigation() {
  return useBaseNavigation<StackNavigationProp<RootStackParamList>>();
}

export default useNavigation;
