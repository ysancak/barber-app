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
  durationMinutes: string;
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
  fullname: string;
  availability: string;
  businessID: string;
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
