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
  Campaigns: undefined;
  MyAccount: undefined;
  EditProfile: undefined;
  Settings: undefined;
  LanguageSettings: undefined;
  Faq: undefined;
};
