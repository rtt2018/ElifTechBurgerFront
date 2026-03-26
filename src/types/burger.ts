export type User = {
  email: string;
  name?: string;
  password?: string;
  phone?: string;
};

export type Burger = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  shopName: string;
};

export type BurgerState = {
  hits: Burger[];
  page: number;
  perPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalItems: number;
  sortBy: string | null;
  sortOrder: string | null;
  isLoading: boolean;
  isError: boolean;
};

export type GetBurgersResponse = {
  hits: Burger[];
  page: number;
  perPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalItems: number;
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

export type OrderStatus =
  | "creating"
  | "pending"
  | "paid"
  | "shipped"
  | "completed"
  | "cancelled";

export type OrderState = {
  cart: CartItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string | null;
  isLoading: boolean;
};

export type CartItem = {
  _id?: string;
  burger: Burger;
  amount: number;
};

export type Order = {
  _id: string;
  position: {
    burger: Burger;
    price: number;
    amount: number;
  }[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
};

export type OrdersState = {
  orders: Order[];
  isLoading: boolean;
  isError: boolean;
  isSendRequest: boolean;
};

export type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type GetBurgersParams = {
  patch: string;
  searchParams: string | URLSearchParams;
};

export type GetOrdersParams = {
  patch: string;
  searchParams: string | URLSearchParams;
};
