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

type SelectOption = {
  [key: string]: any;
};

type SelectValue = string | number;

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
  SaloonDetail: {id: string};
  SelectInputDetail: {
    title: string;
    options: SelectOption[];
    selectedValue: SelectOption | undefined;
    onOptionChange: (item: any) => void;
    optionLabel: string;
    optionValue: string;
  };
  MapListing: undefined;
  AddressInputDetail: {
    title: string;
    onChange: (label: string, coordinate: Coordinate) => void;
  };
  ShoppingCart: undefined;
};

type Coordinate = {
  latitude: number;
  longitude: number;
};
