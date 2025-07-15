import { create } from "zustand";

type User = {
  username: string;
};

type AuthState = {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (username) => set({ user: { username } }),
  logout: () => set({ user: null }),
}));
