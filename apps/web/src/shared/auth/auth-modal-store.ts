import { create } from "zustand";

export type AuthModalMode = "signin" | "signup" | "forgot-password";

interface AuthModalState {
  isOpen: boolean;
  mode: AuthModalMode;
  redirectTo?: string;
}

interface AuthModalActions {
  openModal: (mode: AuthModalMode, redirectTo?: string) => void;
  closeModal: () => void;
  switchMode: (mode: AuthModalMode) => void;
  setRedirectTo: (redirectTo: string) => void;
}

export type AuthModalStore = AuthModalState & AuthModalActions;

export const useAuthModalStore = create<AuthModalStore>((set) => ({
  // State
  isOpen: false,
  mode: "signin",
  redirectTo: undefined,

  // Actions
  openModal: (mode, redirectTo) =>
    set({
      isOpen: true,
      mode,
      redirectTo,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      mode: "signin",
      redirectTo: undefined,
    }),

  switchMode: (mode) =>
    set((state) => ({
      ...state,
      mode,
    })),

  setRedirectTo: (redirectTo) =>
    set((state) => ({
      ...state,
      redirectTo,
    })),
}));
