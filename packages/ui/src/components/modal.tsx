import {
  Modal as HeroUIModal,
  ModalProps as HeroUIModalProps,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { cn } from "@workspace/ui/lib/utils";

export interface ModalProps extends HeroUIModalProps {}

export function Modal({ className, ...props }: ModalProps) {
  return <HeroUIModal className={cn(className)} {...props} />;
}

export { ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure };
