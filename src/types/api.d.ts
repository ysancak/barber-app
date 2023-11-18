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
  businessTel: string;
  businessMail: string;
  businessWebsite: string;
  socialFacebook: string;
  socialInstagram: string;
  businessImages: string[];
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
};
