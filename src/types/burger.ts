export type User = {
  email: string;
  name: string;
  password: string;
  phone: string;
};

export type Burger = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  shopName: string;
};

export type UserState = {
  user: {
    name: string | null;
    email: string | null;
    phone: string | null;
    _id?: string | null;
  };
  isLoggedIn: boolean;
  isLoading: boolean;
  error: unknown;
  token: string | null;
  isRefreshing: boolean;
};
