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
};

type Review = {
  _id: string;
  reviewsDetails: string;
  businessID: string;
  reviewPoint: string;
  reviewOwner: string;
  reviewDate: string;
  userID: string;
};

type Service = {
  _id: string;
  serviceName: string;
  description: string;
  price: number;
  currency: string;
  durationMinutes: string;
  category: string;
  serviceType: string;
  businessID: string;
};

type SaloonDetail = {
  business: Saloon;
  reviews: Review[];
  services: Service[];
};

type Product = {
  _id: string;
  productName: string;
  price: number;
  currency: string;
  category: string;
  description: string;
  productImage: string;
  businessID: string;
};
