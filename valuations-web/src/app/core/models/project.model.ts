export type Currency = 'PEN' | 'USD' | 'EUR';

export interface Project {
  id: number;
  code: string;
  name: string;
  description?: string | null;
  clientName?: string | null;
  location?: string | null;
  currency?: Currency;
  contractAmount?: number | null;
  active?: boolean;
  createdAt?: string;
}
