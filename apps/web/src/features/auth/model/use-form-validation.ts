import { useState } from "react";

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface FormValidationConfig {
  [fieldName: string]: ValidationRules;
}

interface UseFormValidationReturn {
  errors: Record<string, string>;
  validateField: (fieldName: string, value: string) => string | null;
  validateForm: (formData: FormData) => boolean;
  clearErrors: () => void;
  setFieldError: (fieldName: string, error: string) => void;
}

export function useFormValidation(
  config: FormValidationConfig
): UseFormValidationReturn {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (fieldName: string, value: string): string | null => {
    const rules = config[fieldName];

    if (!rules) return null;

    const trimmedValue = value.trim();

    // Required validation
    if (rules.required && !trimmedValue) {
      return `${fieldName} is required`;
    }

    // Skip other validations if field is empty and not required
    if (!trimmedValue && !rules.required) return null;

    // Length validations
    if (rules.minLength && value.length < rules.minLength) {
      return `${fieldName} must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `${fieldName} must be no more than ${rules.maxLength} characters`;
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      return `${fieldName} format is invalid`;
    }

    // Custom validation
    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  };

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate all configured fields
    const isValid = Object.keys(config).every((fieldName) => {
      const value = (formData.get(fieldName) as string) || "";
      const error = validateField(fieldName, value);

      if (error) {
        newErrors[fieldName] = error;

        return false;
      }

      return true;
    });

    setErrors(newErrors);

    return isValid;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const setFieldError = (fieldName: string, error: string) => {
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    setFieldError,
  };
}
