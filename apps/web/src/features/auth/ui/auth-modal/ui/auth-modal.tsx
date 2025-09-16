"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@workspace/ui/modal";
import { useTranslations } from "next-intl";

import {
  ForgotPasswordFormModal,
  SignInFormModal,
  SignUpFormModal,
} from "@/features/auth/ui/forms";
import { useAuthModalStore } from "@/shared/auth/auth-modal-store";

export function AuthModal() {
  const { isOpen, mode, closeModal } = useAuthModalStore();
  const tSignin = useTranslations("Auth.signin");
  const tSignup = useTranslations("Auth.signup");
  const tForgotPassword = useTranslations("Auth.forgotPassword");

  const getModalContent = () => {
    switch (mode) {
      case "signin":
        return {
          title: tSignin("title"),
          description: tSignin("description"),
        };
      case "signup":
        return {
          title: tSignup("title"),
          description: tSignup("description"),
        };
      case "forgot-password":
        return {
          title: tForgotPassword("title"),
          description: tForgotPassword("description"),
        };
      default:
        return {
          title: tSignin("title"),
          description: tSignin("description"),
        };
    }
  };

  const renderForm = () => {
    switch (mode) {
      case "signin":
        return <SignInFormModal />;
      case "signup":
        return <SignUpFormModal />;
      case "forgot-password":
        return <ForgotPasswordFormModal />;
      default:
        return <SignInFormModal />;
    }
  };

  const { title, description } = getModalContent();

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      placement="center"
      size="sm"
      onClose={closeModal}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-center">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-small text-default-500">{description}</p>
        </ModalHeader>
        <ModalBody className="pb-6">{renderForm()}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
