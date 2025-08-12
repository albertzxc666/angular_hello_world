import { CartItem } from '../../models/CartItem.model';

export interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

export const initialState: CartState = {
  items: [],
  loading: false,
  error: null
};

