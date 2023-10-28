type RootState = ReturnType<typeof store.getState>;

type KeyboardType =
  | 'default'
  | 'numeric'
  | 'email-address'
  | 'ascii-capable'
  | 'numbers-and-punctuation'
  | 'url'
  | 'number-pad'
  | 'phone-pad'
  | 'name-phone-pad'
  | 'decimal-pad'
  | 'twitter'
  | 'web-search'
  | 'visible-password';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  EditProfile: undefined;
};
