export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  code?: string;
  icon: string;
  bgColor: string;
  textColor: string;
  expiryDate: string; // ISO date format: YYYY-MM-DD
  active: boolean;
  link?: string;
}
