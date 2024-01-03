export type User = {
  id: number;
  name: string;
  email: string;
  favs: number[];
  password: string;
  watchlist: number[];
  isLoggedInBefore: boolean;
};
