import { useNavigation as useBaseNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export function useNavigation() {
  return useBaseNavigation<StackNavigationProp<RootStackParamList>>();
}