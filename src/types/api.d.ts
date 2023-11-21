type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

type UserResponse = {
  email: string;
};

type FaqResponse = {
  _id: string;
  question: string;
  answer: string;
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
