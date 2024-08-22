import {
  NavigationState,
  ParamListBase,
  PartialState,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

export function navigate<T extends ParamListBase>(name: keyof T, params?: {}) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(String(name), params);
  }
}

export function resetNavigationState(state: PartialState<NavigationState>) {
  if (navigationRef.isReady()) {
    navigationRef.reset(state);
  }
}
