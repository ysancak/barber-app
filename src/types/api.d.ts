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
