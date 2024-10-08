type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

type User = {
  email: string;
  name: string;
  surname: string;
  email: string;
  gsm: string;
  street: string;
  no: string;
  postcode: string;
  ort: string;
};

type FaqResponse = {
  _id: string;
  question: string;
  answer: string;
};

type DiscountType = {
  type: '%' | 'CHF';
  value: number;
};

type Discount = {
  couponValue: DiscountType;
  couponMinValue: number;
};

type Category = {
  _id: string;
  categoryName: string;
};

type Saloon = {
  _id: string;
  businessLocation: string;
  businessID: string;
  businessImage: string;
  businessName: string;
  businessTel?: string;
  businessMail?: string;
  businessWebsite?: string;
  businessLat: number;
  businessLong: number;
  socialFacebook?: string;
  socialInstagram?: string;
  businessImages?: string[];
  businessFirstName?: string;
  businessNr?: string;
  businessOrt?: string;
  businessPostCode?: string;
  businessSurname?: string;
  businessDescription?: string;
  averageReviewPoint?: number;
  reviewCount?: number;
  isFavorite: boolean;
};

type Review = {
  _id: string;
  reviewDetails: string;
  businessID: string;
  reviewPoint: number;
  reviewOwner: string;
  reviewDate: string;
  userID: string;
};

type Service = {
  _id: string;
  serviceName: string;
  description: string;
  price: number;
  oldprice?: number;
  durationMinutes: number;
  category: string;
  categoryName: string;
  serviceType: string;
  businessID: string;
  mwstName: string;
  mwstValue: string;
  mwstPrice: string;
  inCampaign: boolean;
};

type SaloonDetail = {
  business: Saloon;
  reviews: Review[];
  services: Service[];
  products: Product[];
};

type Product = {
  _id: string;
  productName: string;
  price: number;
  oldprice?: number;
  category: string;
  categoryName: string;
  description: string;
  productImage: string;
  businessID: string;
  mwstName: string;
  mwstValue: string;
  mwstPrice: string;
  inCampaign: boolean;
};

type Order = {
  _id: string;
  name: string;
  surname: string;
  email: string;
  gsm: string;
  street: string;
  postcode: string;
  ort: string;
  startDate: string;
  endDate: string;
  duration: string;
  business: Saloon;
  orderNumber: string;
  note: string;
  paymentStatus: 'Success';
  userID: string;
  orderPrice: string;
  subtotal: string;
  couponCode?: string;
  orderItems: (Product | Service)[];
};

type Campaign = {
  _id: string;
  businessID: string;
  campaignName: string;
  campaignDescription: string;
  campaignEndDate: string;
  campaignType: string;
  businessDetails: Saloon;
};

type WorkerShift = {
  start: string;
  end: string;
  offday: 'on' | 'off';
};

type Worker = {
  _id: string;
  name: string;
  surname: string;
  fullName: string;
  availability: string;
  businessID: string;
  workerColor: string;
  hours: {
    0: WorkerShift;
    1: WorkerShift;
    2: WorkerShift;
    3: WorkerShift;
    4: WorkerShift;
    5: WorkerShift;
    6: WorkerShift;
  };
};

type CustomerCalendarResponse = {
  events: CalendarEvent[]
  hours: {
    0: WorkerShift;
    1: WorkerShift;
    2: WorkerShift;
    3: WorkerShift;
    4: WorkerShift;
    5: WorkerShift;
    6: WorkerShift;
  };
  holidays: WorkerDayOff[]
}

type OrderRequestParams = {
  name: string;
  surname: string;
  email: string;
  gsm: string;
  street: string;
  no: string;
  postcode: string;
  ort: string;
  note?: string;
  businessID: string;
  workerID: string;
  orderItems: [any];
  startDate: string; // Z00.0
  endDate: string; // Z00.0
  couponCode: string; // DFJD845
  orderPrice: string; // 100 CHF
};

type Slide = {
  _id: string;
  image_path: string;
  slideBig: string;
  slideSmall: string;
};

type WorkerDayOff = {
  _id: string;
  businessID: string;
  HolidayEndDate: string;
  HolidayStartDate: string;
  workerID: string;
  workerName: string;
};

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  worker: Worker;
  clientTel: string;
  customerName: string;
  customerSurname: string;
};
