import {
  useAuthModalStore,
  type AuthModalMode,
} from "../../../shared/auth/auth-modal-store";

interface UseAuthModalReturn {
  isOpen: boolean;
  mode: AuthModalMode;
  openSignIn: (redirectTo?: string) => void;
  openSignUp: (redirectTo?: string) => void;
  openForgotPassword: (redirectTo?: string) => void;
  closeModal: () => void;
  switchToSignIn: () => void;
  switchToSignUp: () => void;
  switchToForgotPassword: () => void;
}

export function useAuthModal(): UseAuthModalReturn {
  const { isOpen, mode, openModal, closeModal, switchMode } =
    useAuthModalStore();

  return {
    isOpen,
    mode,
    openSignIn: (redirectTo) => openModal("signin", redirectTo),
    openSignUp: (redirectTo) => openModal("signup", redirectTo),
    openForgotPassword: (redirectTo) =>
      openModal("forgot-password", redirectTo),
    closeModal,
    switchToSignIn: () => switchMode("signin"),
    switchToSignUp: () => switchMode("signup"),
    switchToForgotPassword: () => switchMode("forgot-password"),
  };
}
