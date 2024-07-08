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

interface ButtonProps {
  text: string;
  onPress?: () => void;
  type: 'default' | 'secondary' | 'text';
  labelStyle?: StyleProp<TextStyle>;
}

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
  Tabs: undefined;
  EditProfile: undefined;
  Settings: undefined;
  LanguageSettings: undefined;
  Faq: undefined;
  MyOrders: undefined;
  MyOrderDetail: {order: Order; deletable: boolean};
  SaloonDetail: {businessID: string};
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
  ShoppingCart: {businessID: string};
  Calendar: {businessID: string};
  PasswordConfirmation: {
    onSuccess: () => void;
  };
  OrderUserInfo: {businessID: string};
  OrderResult: {businessID: string};
  Payment: {businessID: string; link: string};
  // Admin
  AdminDashboard: undefined;
  AdminLogin: undefined;
  AdminWorkerManagement: undefined;
  AdminWorkers: undefined;
  AdminAddWorker: undefined;
  AdminEditWorker: Worker;
  AdminWorkerDayOffs: undefined;
  AdminAddDayOff: undefined;
  AdminEditDayOff: WorkerDayOff;
  AdminCalendar: undefined;
  AdminAddCalendarEvent?: {date: string};
  AdminEditCalendarEvent: CalendarEvent;
};

type Coordinate = {
  latitude: number;
  longitude: number;
};
