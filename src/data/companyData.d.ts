export interface CompanyData {
  currency: string;
  revenue: {
    totalInvest: string;
    yearlyRevenue: string;
    growthRatio: string;
  };
  address: {
    headQuarters: string;
    devOffice: string;
    email: string;
    phoneno: string;
    mapLink: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
  descriptorTag: string;
  benefits: Array<{
    title: string;
    description: string;
  }>;
  pricing: Array<{
    title: string;
    priceMonthly: string;
    priceAnnualy: string;
    recommended: boolean;
    icon: string;
    discount: string;
  }>;
  reviews: Array<{
    name: string;
    designation: string;
    comment: string;
    company: string;
    photo: string;
  }>;
  blogs: Array<{
    author: string;
    date: string;
    photo: string;
    title: string;
    description: string;
    link: string;
  }>;
  clients: Array<{
    name: string;
    logo: string;
  }>;
  products: Array<{
    name: string;
    tagline?: string;
    description: string;
    photo: string;
    link: string;
    features?: string[];
    benefits?: string[];
  }>;
  hs_form_contact: {
    portalId: string;
    contactFormId: string;
    jobFormId: string;
  };
  members: Array<{
    name: string;
    title: string;
    about: string;
    photo: string;
    website: string;
    linkedin: string;
    instagram: string;
    twitter: string;
    facebook: string;
  }>;
}

declare const companyData: CompanyData;
export default companyData;
